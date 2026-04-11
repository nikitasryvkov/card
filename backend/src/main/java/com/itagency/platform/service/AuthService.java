package com.itagency.platform.service;

import com.itagency.platform.dto.auth.AuthResponse;
import com.itagency.platform.dto.auth.LoginRequest;
import com.itagency.platform.dto.auth.RegisterRequest;
import com.itagency.platform.entity.Role;
import com.itagency.platform.entity.User;
import com.itagency.platform.repository.UserRepository;
import com.itagency.platform.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    @Transactional
    public AuthenticatedSession register(RegisterRequest request) {
        if (userRepository.existsByEmailIgnoreCase(request.email())) {
            throw new IllegalArgumentException("Registration could not be completed.");
        }

        String companyName = request.companyName() == null ? null : request.companyName().trim();
        if (companyName != null && companyName.isBlank()) {
            companyName = null;
        }

        User user = User.builder()
                .fullName(request.fullName().trim())
                .companyName(companyName)
                .email(request.email().trim().toLowerCase())
                .passwordHash(passwordEncoder.encode(request.password()))
                .role(Role.ROLE_USER)
                .enabled(true)
                .locked(false)
                .build();

        User savedUser = userRepository.save(user);
        return buildAuthenticatedSession(savedUser);
    }

    public AuthenticatedSession login(LoginRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.email().trim().toLowerCase(), request.password())
        );

        User user = (User) authentication.getPrincipal();
        return buildAuthenticatedSession(user);
    }

    public AuthResponse toResponse(User user) {
        return new AuthResponse(user.getEmail(), user.getFullName(), user.getRole().name());
    }

    private AuthenticatedSession buildAuthenticatedSession(User user) {
        String token = jwtService.generateToken(user);
        return new AuthenticatedSession(token, toResponse(user));
    }
}
