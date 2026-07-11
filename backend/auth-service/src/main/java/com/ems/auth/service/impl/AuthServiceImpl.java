package com.ems.auth.service.impl;

import com.ems.auth.dto.ForgetPasswordChange;
import com.ems.auth.dto.ForgetPasswordRequest;
import com.ems.auth.dto.LoginRequest;
import com.ems.auth.dto.RegisterRequest;
import com.ems.auth.entity.PasswordResetToken;
import com.ems.auth.entity.Roles;
import com.ems.auth.entity.User;
import com.ems.auth.event.PasswordResetRequestedEvent;
import com.ems.auth.repository.PasswordResetTokenRepository;
import com.ems.auth.repository.RoleRepository;
import com.ems.auth.repository.UserRepository;
import com.ems.auth.security.JwtService;
import com.ems.auth.service.AuthService;
import com.ems.auth.service.PasswordResetEventPublisher;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;
import java.util.Set;
import java.util.UUID;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceImpl implements AuthService {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final PasswordResetTokenRepository passwordResetTokenRepository;
    private final PasswordResetEventPublisher passwordResetEventPublisher;
    @Value("${app.frontend.reset-password-url:http://localhost:3000/reset-password}")
    private String resetPasswordUrl;

    @Override
    public String register(RegisterRequest registerRequest) {
        if(userRepository.existsByEmail(registerRequest.getEmail())){
            throw new RuntimeException("Email already exists");
        }
        Roles role = roleRepository.findByName(registerRequest.getRole())
                .orElseThrow(() -> new RuntimeException("Role not found"));
        User user=User.builder()
                .name(registerRequest.getName())
                .email(registerRequest.getEmail())
                .password(passwordEncoder.encode(registerRequest.getPassword()))
                .roles(Set.of(role))
                .enabled(true)
                .build();
        userRepository.save(user);
        return jwtService.generateToken(user);
    }

    @Override
    public String login(LoginRequest loginRequest){
        User user=userRepository.findByEmail(loginRequest.getEmail())
                .orElseThrow(()-> new RuntimeException("Invalid email"));
        if(!passwordEncoder.matches(loginRequest.getPassword(),user.getPassword())){
            throw new RuntimeException("Invalid email or password");
        }

        return jwtService.generateToken(user);
    }

    @Override
    public void forgotPassword(ForgetPasswordRequest forgetPasswordRequest){
        log.info("Forgot password request received");

        if(forgetPasswordRequest.getEmail() == null || forgetPasswordRequest.getEmail().isBlank()){
            log.warn("Forgot password validation failed: email is required");
            throw new RuntimeException("Email is required");
        }

        User user = userRepository.findByEmail(forgetPasswordRequest.getEmail())
                .orElseThrow(() -> {
                    log.warn("Forgot password failed: user not found for email {}",
                            forgetPasswordRequest.getEmail());
                    return new RuntimeException("User not found");
                });
        String token= UUID.randomUUID().toString();

        LocalDateTime expiresAt = LocalDateTime.now().plusMinutes(15);

        PasswordResetToken passwordResetToken = PasswordResetToken.builder()
                .token(token)
                .user(user)
                .expiresAt(expiresAt)
                .used(false)
                .createdAt(LocalDateTime.now())
                .updatedAt(LocalDateTime.now())
                .build();
        passwordResetTokenRepository.save(passwordResetToken);

        String resetLink = resetPasswordUrl
                + "?token=" + token
                + "&email=" + URLEncoder.encode(user.getEmail(), StandardCharsets.UTF_8);

        passwordResetEventPublisher.publish(
                new PasswordResetRequestedEvent(
                        user.getEmail(),
                        user.getName(),
                        resetLink,
                        expiresAt
                )
        );

        log.info("Password reset event published for email {}", user.getEmail());

    }

    @Override
    public void forgetPasswordChange(ForgetPasswordChange request) {
        if (!request.getNewPassword().equals(request.getConfirmPassword())) {
            throw new RuntimeException("Passwords do not match");
        }

        PasswordResetToken resetToken = passwordResetTokenRepository.findByToken(request.getToken())
                .orElseThrow(() -> new RuntimeException("Invalid reset token"));

        if (resetToken.isUsed()) {
            throw new RuntimeException("Reset token already used");
        }

        if (resetToken.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Reset token expired");
        }

        User user = resetToken.getUser();

        if (!user.getEmail().equalsIgnoreCase(request.getEmail())) {
            throw new RuntimeException("Invalid reset token");
        }

        user.setPassword(passwordEncoder.encode(request.getNewPassword()));
        userRepository.save(user);

        resetToken.setUsed(true);
        resetToken.setUpdatedAt(LocalDateTime.now());
        passwordResetTokenRepository.save(resetToken);

        log.info("Password reset completed for email {}", user.getEmail());
    }
}
