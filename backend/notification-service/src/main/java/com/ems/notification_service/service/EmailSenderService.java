package com.ems.notification_service.service;

public interface EmailSenderService {
    void send(String to, String subject, String body);
}
