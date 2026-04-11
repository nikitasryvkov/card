package com.itagency.platform.dto.auth;

public record AuthResponse(
        String email,
        String fullName,
        String role
) {
}
