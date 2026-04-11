package com.itagency.platform.dto.auth;

public record AuthResponse(
        String token,
        String email,
        String fullName,
        String role
) {
}
