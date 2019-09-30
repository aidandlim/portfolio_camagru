package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class MailService {

    @Autowired
    JavaMailSender javaMailSender;

    boolean sendVerifyMail(User user) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(user.getEmail());

            msg.setSubject("Verify Your Email to Camagru Application");
            msg.setText("Enter link to verify your email address : https://camagru.aidandlim.com:8443/verify?email=" + user.getEmail() + "&uuid=" + user.getUuid());

            javaMailSender.send(msg);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
