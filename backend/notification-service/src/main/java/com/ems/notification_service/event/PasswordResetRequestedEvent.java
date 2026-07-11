package com.ems.notification_service.event;

import java.time.LocalDateTime;

public record PasswordResetRequestedEvent(
        String email,
        String employeeName,
        String resetLink,
        LocalDateTime expiresAt
) {
}
