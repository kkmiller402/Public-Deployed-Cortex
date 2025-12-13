package com.resume.cortex.service;

import java.time.LocalDateTime;
import java.util.regex.Pattern;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.resume.cortex.dto.LoginRequest;
import com.resume.cortex.dto.LoginResponse;
import com.resume.cortex.dto.RegisterRequest;
import com.resume.cortex.entity.User;
import com.resume.cortex.enums.Roles;
import com.resume.cortex.repo.UserRepo;
import com.resume.cortex.utils.JwtUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserRepo repo;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;
    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$");
    private static final Pattern PASSWORD_PATTERN = Pattern.compile("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).{10,}$");

    public LoginResponse login(LoginRequest request) {
        User user = repo.findByEmail(request.getEmail())
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        if (!repo.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email not found");
        } else if (!passwordEncoder.matches(request.getPassword(), user.getEncPass())) {
            throw new IllegalArgumentException("Invalid password");
        }

        String token = jwtUtils.generateToken(user.getEmail(), user.getRole().toString());

        return new LoginResponse(token, user.getEmail(), user.getRole().toString());
    }

    public LoginResponse register(RegisterRequest request) {
        if (repo.existsByEmail(request.getEmail())) {
            throw new IllegalArgumentException("Email already registered");
        } else if (!EMAIL_PATTERN.matcher(request.getEmail()).matches()) {
            throw new IllegalArgumentException("Invalid email format");
        } else if (!PASSWORD_PATTERN.matcher(request.getPassword()).matches()) {
            throw new IllegalArgumentException("Password does not meet complexity requirements");
        } else if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new IllegalArgumentException("Passwords do not match");
        }

        User user = new User();
        user.setEmail(request.getEmail());
        user.setEncPass(passwordEncoder.encode(request.getPassword()));
        user.setFirstName(request.getFirstName());
        user.setMiddleInitial(request.getMiddleInitial());
        user.setLastName(request.getLastName());
        user.setSuffix(request.getSuffix());
        user.setPhone(request.getPhone());
        user.setLocation(request.getLocation());
        user.setCreatedDate(LocalDateTime.now());
        user.setRole(Roles.BASE); // Default role
        user.setLastSignedIn(LocalDateTime.now());

        User savedUser = repo.save(user);

        String token = jwtUtils.generateToken(savedUser.getEmail(), savedUser.getRole().toString());

        return new LoginResponse(token, savedUser.getFullName(), savedUser.getRole().toString());
    }
}
