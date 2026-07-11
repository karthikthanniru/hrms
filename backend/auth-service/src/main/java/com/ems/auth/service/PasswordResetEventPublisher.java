package com.ems.auth.service;

import com.ems.auth.config.RabbitMQConfig;
import com.ems.auth.event.PasswordResetRequestedEvent;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.stereotype.Service;


@Service
@RequiredArgsConstructor
public class PasswordResetEventPublisher {

    private final RabbitTemplate rabbitTemplate;

    public void publish(PasswordResetRequestedEvent event){
        rabbitTemplate.convertAndSend(RabbitMQConfig.NOTIFICATION_EXCHANGE,
                RabbitMQConfig.PASSWORD_RESET_ROUTING_KEY,
                event);
    }
}
