package com.itagency.platform.security;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.itagency.platform.dto.common.ApiErrorResponse;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.time.Duration;
import java.time.Instant;
import java.time.OffsetDateTime;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.ConcurrentMap;
import java.util.concurrent.atomic.AtomicInteger;

@Component
public class AuthRateLimitFilter extends OncePerRequestFilter {

    private static final Duration LOGIN_WINDOW = Duration.ofMinutes(5);
    private static final Duration REGISTER_WINDOW = Duration.ofMinutes(30);
    private static final int LOGIN_LIMIT = 10;
    private static final int REGISTER_LIMIT = 5;

    private final ObjectMapper objectMapper;
    private final ConcurrentMap<String, RateWindow> windows = new ConcurrentHashMap<>();
    private final AtomicInteger requestCounter = new AtomicInteger();

    public AuthRateLimitFilter(ObjectMapper objectMapper) {
        this.objectMapper = objectMapper;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) {
        if (!HttpMethod.POST.matches(request.getMethod())) {
            return true;
        }

        String path = request.getRequestURI();
        return !"/api/v1/auth/login".equals(path) && !"/api/v1/auth/register".equals(path);
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        String path = request.getRequestURI();
        Instant now = Instant.now();
        int limit = "/api/v1/auth/register".equals(path) ? REGISTER_LIMIT : LOGIN_LIMIT;
        Duration window = "/api/v1/auth/register".equals(path) ? REGISTER_WINDOW : LOGIN_WINDOW;

        String key = path + ":" + getClientIp(request);
        RateWindow rateWindow = windows.computeIfAbsent(key, ignored -> new RateWindow());

        if (!rateWindow.tryAcquire(limit, window, now)) {
            ApiErrorResponse body = new ApiErrorResponse(
                    OffsetDateTime.now(),
                    HttpStatus.TOO_MANY_REQUESTS.value(),
                    HttpStatus.TOO_MANY_REQUESTS.getReasonPhrase(),
                    "Too many authentication attempts. Please try again later.",
                    path,
                    Map.of()
            );
            response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
            objectMapper.writeValue(response.getOutputStream(), body);
            return;
        }

        cleanupExpiredWindows(now);
        filterChain.doFilter(request, response);
    }

    private String getClientIp(HttpServletRequest request) {
        String forwardedFor = request.getHeader("X-Forwarded-For");
        if (forwardedFor != null && !forwardedFor.isBlank()) {
            return forwardedFor.split(",")[0].trim();
        }
        return request.getRemoteAddr();
    }

    private void cleanupExpiredWindows(Instant now) {
        if (requestCounter.incrementAndGet() % 200 != 0) {
            return;
        }

        windows.entrySet().removeIf(entry -> entry.getValue().isExpired(now, REGISTER_WINDOW));
    }

    private static final class RateWindow {

        private Instant startedAt = Instant.EPOCH;
        private int attempts = 0;

        synchronized boolean tryAcquire(int limit, Duration duration, Instant now) {
            if (startedAt.plus(duration).isBefore(now)) {
                startedAt = now;
                attempts = 0;
            }

            if (attempts >= limit) {
                return false;
            }

            attempts++;
            return true;
        }

        synchronized boolean isExpired(Instant now, Duration duration) {
            return startedAt.plus(duration.multipliedBy(2)).isBefore(now);
        }
    }
}
