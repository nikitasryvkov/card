package com.itagency.platform.dto.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record RegisterRequest(
        @NotBlank @Size(max = 160) String fullName,
        @Email @NotBlank String email,
        @NotBlank @Size(min = 8, max = 72) String password,
        @Size(max = 160) String companyName
) {
}
