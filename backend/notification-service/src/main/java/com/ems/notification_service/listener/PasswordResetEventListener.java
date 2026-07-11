package com.ems.notification_service.listener;

import com.ems.notification_service.config.RabbitMQConfig;
import com.ems.notification_service.entity.Notification;
import com.ems.notification_service.event.PasswordResetRequestedEvent;
import com.ems.notification_service.repository.NotificationRepository;
import com.ems.notification_service.service.EmailSenderService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import org.springframework.web.util.HtmlUtils;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;

@Component
@RequiredArgsConstructor
@Slf4j
public class PasswordResetEventListener {

    private final EmailSenderService emailSenderService;
    private final NotificationRepository notificationRepository;

    @RabbitListener(queues = RabbitMQConfig.PASSWORD_RESET_QUEUE)
    public void handlePasswordResetRequested(PasswordResetRequestedEvent event) {
        String subject = "Reset your EMS password";
        String body = buildPasswordResetEmail(event);

        Notification notification = new Notification();
        notification.setRecipient(event.email());
        notification.setSubject(subject);
        notification.setBody(body);
        notification.setType("PASSWORD_RESET");
        notification.setStatus("PENDING");
        notification.setCreatedAt(LocalDateTime.now());
        notificationRepository.save(notification);

        try {
            emailSenderService.send(event.email(), subject, body);
            notification.setStatus("SENT");
            notification.setSentAt(LocalDateTime.now());
            notificationRepository.save(notification);
            log.info("Password reset email sent to {}", event.email());
        } catch (RuntimeException ex) {
            notification.setStatus("FAILED");
            notificationRepository.save(notification);
            log.error("Failed to send password reset email to {}", event.email(), ex);
            throw ex;
        }
    }

    private String buildPasswordResetEmail(PasswordResetRequestedEvent event) {
        String employeeName = HtmlUtils.htmlEscape(event.employeeName());
        String resetLink = HtmlUtils.htmlEscape(event.resetLink());
        long minutes = Math.max(1, ChronoUnit.MINUTES.between(LocalDateTime.now(), event.expiresAt()));

        return """
                <!DOCTYPE html>
                <html>
                <body style="margin:0;padding:0;background:#f4f7fb;font-family:Arial,sans-serif;color:#1f2937;">
                  <table width="100%%" cellpadding="0" cellspacing="0" style="background:#f4f7fb;padding:32px 0;">
                    <tr>
                      <td align="center">
                        <table width="600" cellpadding="0" cellspacing="0" style="width:600px;max-width:94%%;background:#ffffff;border:1px solid #e5e7eb;border-radius:8px;">
                          <tr>
                            <td style="background:#0f766e;color:#ffffff;padding:24px 28px;">
                              <h1 style="margin:0;font-size:22px;">EMS password reset</h1>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:28px;">
                              <p style="margin:0 0 16px;font-size:15px;line-height:1.6;">Hi %s,</p>
                              <p style="margin:0 0 20px;font-size:15px;line-height:1.6;">We received a request to reset your Employee Management System password.</p>
                              <p style="margin:0 0 24px;">
                                <a href="%s" style="display:inline-block;background:#0f766e;color:#ffffff;text-decoration:none;padding:12px 20px;border-radius:6px;font-weight:bold;">Reset password</a>
                              </p>
                              <p style="margin:0 0 12px;font-size:14px;line-height:1.6;color:#4b5563;">This link expires in %d minutes. If you did not request this change, ignore this email.</p>
                              <p style="margin:20px 0 0;font-size:12px;line-height:1.6;color:#6b7280;word-break:break-all;">%s</p>
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                  </table>
                </body>
                </html>
                """.formatted(employeeName, resetLink, minutes, resetLink);
    }
}
