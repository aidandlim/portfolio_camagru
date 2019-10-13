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

    void sendVerifyMail(User user) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(user.getEmail());

            msg.setSubject("Verify Your Email to Camagru Application");
            msg.setText("Enter link to verify your email address : https://camagru.aidandlim.com:8443/verify?email=" + user.getEmail() + "&uuid=" + user.getUuid());

            javaMailSender.send(msg);

            System.out.println("Email has sended to " + user.getEmail());
        } catch (Exception e) {
            return ;
        }
    }

    void sendForgotMail(User user) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(user.getEmail());

            msg.setSubject("Sign into Camagru Application with temporary password");
            msg.setText("Here is temporary password : " + user.getUuid());

            javaMailSender.send(msg);

            System.out.println("Email has sended to " + user.getEmail());
        } catch (Exception e) {
            return ;
        }
    }

    void sendNotificationMail(String email) {
        try {
            SimpleMailMessage msg = new SimpleMailMessage();
            msg.setTo(email);

            msg.setSubject("New notification from Camagru Application");
            msg.setText("You have a new notification from Camagru Application! Check it out now!");

            javaMailSender.send(msg);

            System.out.println("Email has sended to " + email);
        } catch (Exception e) {
            return ;
        }
    }

}
