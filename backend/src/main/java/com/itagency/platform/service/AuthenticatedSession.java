package com.itagency.platform.service;

import com.itagency.platform.dto.auth.AuthResponse;

public record AuthenticatedSession(
        String accessToken,
        AuthResponse user
) {
}
