package com.aidandlim.camagru.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    JavaMailSender javaMailSender;

    void sendMail() {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setTo("ortivo.sol@gmail.com");

        msg.setSubject("Subject");
        msg.setText("Text");

        javaMailSender.send(msg);
    }

}
