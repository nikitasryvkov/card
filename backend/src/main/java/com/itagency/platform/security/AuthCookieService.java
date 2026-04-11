package com.itagency.platform.security;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseCookie;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
public class AuthCookieService {

    @Value("${app.security.cookie.name:agency_access_token}")
    private String cookieName;

    @Value("${app.security.cookie.path:/}")
    private String cookiePath;

    @Value("${app.security.cookie.same-site:Strict}")
    private String sameSite;

    private final JwtService jwtService;

    public AuthCookieService(JwtService jwtService) {
        this.jwtService = jwtService;
    }

    public ResponseCookie createAccessTokenCookie(String token, HttpServletRequest request) {
        return ResponseCookie.from(cookieName, token)
                .httpOnly(true)
                .secure(request.isSecure())
                .sameSite(sameSite)
                .path(cookiePath)
                .maxAge(jwtService.getTokenLifetime())
                .build();
    }

    public ResponseCookie clearAccessTokenCookie(HttpServletRequest request) {
        return ResponseCookie.from(cookieName, "")
                .httpOnly(true)
                .secure(request.isSecure())
                .sameSite(sameSite)
                .path(cookiePath)
                .maxAge(Duration.ZERO)
                .build();
    }

    public String getCookieName() {
        return cookieName;
    }
}
