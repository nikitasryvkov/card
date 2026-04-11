package com.itagency.platform.controller;

import com.itagency.platform.dto.auth.AuthResponse;
import com.itagency.platform.dto.auth.CsrfTokenResponse;
import com.itagency.platform.dto.auth.LoginRequest;
import com.itagency.platform.dto.auth.RegisterRequest;
import com.itagency.platform.entity.User;
import com.itagency.platform.security.AuthCookieService;
import com.itagency.platform.service.AuthService;
import com.itagency.platform.service.AuthenticatedSession;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Registration, cookie-based authentication and current session endpoints")
public class AuthController {

    private final AuthService authService;
    private final AuthCookieService authCookieService;

    @PostMapping("/register")
    @ResponseStatus(HttpStatus.CREATED)
    @Operation(summary = "Register a new client account")
    public AuthResponse register(
            @Valid @RequestBody RegisterRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse
    ) {
        AuthenticatedSession session = authService.register(request);
        httpResponse.addHeader(HttpHeaders.SET_COOKIE, authCookieService.createAccessTokenCookie(session.accessToken(), httpRequest).toString());
        return session.user();
    }

    @PostMapping("/login")
    @Operation(summary = "Authenticate and start the current browser session")
    public AuthResponse login(
            @Valid @RequestBody LoginRequest request,
            HttpServletRequest httpRequest,
            HttpServletResponse httpResponse
    ) {
        AuthenticatedSession session = authService.login(request);
        httpResponse.addHeader(HttpHeaders.SET_COOKIE, authCookieService.createAccessTokenCookie(session.accessToken(), httpRequest).toString());
        return session.user();
    }

    @GetMapping("/me")
    @Operation(summary = "Return the currently authenticated user session")
    public AuthResponse me(@AuthenticationPrincipal User user) {
        return authService.toResponse(user);
    }

    @PostMapping("/logout")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    @Operation(summary = "Clear the current authentication cookie")
    public void logout(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        httpResponse.addHeader(HttpHeaders.SET_COOKIE, authCookieService.clearAccessTokenCookie(httpRequest).toString());
    }

    @GetMapping("/csrf")
    @Operation(summary = "Initialize and return the CSRF token for browser clients")
    public CsrfTokenResponse csrf(CsrfToken csrfToken) {
        return new CsrfTokenResponse(csrfToken.getToken());
    }
}
