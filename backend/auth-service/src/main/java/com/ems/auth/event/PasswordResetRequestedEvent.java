package com.ems.auth.event;

import java.time.LocalDateTime;

public record PasswordResetRequestedEvent(
        String email,
        String employeeName,
        String resetLink,
        LocalDateTime expiresAt
) {
}
