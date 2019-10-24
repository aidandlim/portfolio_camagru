package com.aidandlim.camagru.service;

import com.aidandlim.camagru.config.Const;
import com.aidandlim.camagru.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.internet.MimeMessage;

@Service
public class MailService {

    @Autowired
    JavaMailSender javaMailSender;

    void sendVerifyMail(User user) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            String msg = "";

            msg += "<html>";
            msg += "<header>";
            msg += "<link href=\"https://fonts.googleapis.com/css?family=Astloch|Quicksand&display=swap\" rel=\"stylesheet\">";
            msg += "</header>";
            msg += "<body>";
            msg += "<div style=\"width: 100%; height: auto;\">";
            msg += "<div style=\"width: 100%; height: 50px; position: relative; float: left; background-color: #101010; border-bottom: solid #404040 1px; border-radius: 20px 20px 0 0; color: #808080; font-size: 20px; font-family: 'Astloch', cursive; line-height: 50px; text-indent: 30px;\">#Camagru</div>";
            msg += "<div style=\"width: calc(100% - 40px); height: auto; padding: 20px; position: relative; float: left; background-color: #202020; border-radius: 0 0 20px 20px; color: #AAAAAA; font-size: 14px; font-family: 'Quicksand', sans-serif; text-align: center; line-height: 30px;\">Welcome! " + user.getNickname() + ". Enter link below to verify your email address :<BR><a style=\"color: #AAAAAA; font-weight: 900;\" href=\"" + Const.URL_SERVER + "verify?email=" + user.getEmail() + "&uuid=" + user.getUuid() + "\">Go to Verify Email!</a></div>";
            msg += "</div>";
            msg += "</body>";
            msg += "</html>";

            helper.setText(msg, true);
            helper.setTo(user.getEmail());
            helper.setSubject("Verify Your Email to Camagru Application");
            helper.setFrom("camagru.aidan@gmail.com");

            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            return ;
        }
    }

    void sendForgotMail(User user) {
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

            String msg = "";

            msg += "<html>";
            msg += "<header>";
            msg += "<link href=\"https://fonts.googleapis.com/css?family=Astloch|Quicksand&display=swap\" rel=\"stylesheet\">";
            msg += "</header>";
            msg += "<body>";
            msg += "<div style=\"width: 100%; height: auto;\">";
            msg += "<div style=\"width: 100%; height: 50px; position: relative; float: left; background-color: #101010; border-bottom: solid #404040 1px; border-radius: 20px 20px 0 0; color: #808080; font-size: 20px; font-family: 'Astloch', cursive; line-height: 50px; text-indent: 30px;\">#Camagru</div>";
            msg += "<div style=\"width: calc(100% - 40px); height: auto; padding: 20px; position: relative; float: left; background-color: #202020; border-radius: 0 0 20px 20px; color: #AAAAAA; font-size: 14px; font-family: 'Quicksand', sans-serif; text-align: center; line-height: 30px;\">Here is temporary password :<BR>" + user.getUuid() + "</div>";
            msg += "</div>";
            msg += "</body>";
            msg += "</html>";

            helper.setText(msg, true);
            helper.setTo(user.getEmail());
            helper.setSubject("Sign into Camagru Application with temporary password");
            helper.setFrom("camagru.aidan@gmail.com");

            javaMailSender.send(mimeMessage);
        } catch (Exception e) {
            return ;
        }
    }

    void sendNotificationMail(String email) {
        if(email != null) {
            try {
                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, "utf-8");

                String msg = "";

                msg += "<html>";
                msg += "<header>";
                msg += "<link href=\"https://fonts.googleapis.com/css?family=Astloch|Quicksand&display=swap\" rel=\"stylesheet\">";
                msg += "</header>";
                msg += "<body>";
                msg += "<div style=\"width: 100%; height: auto;\">";
                msg += "<div style=\"width: 100%; height: 50px; position: relative; float: left; background-color: #101010; border-bottom: solid #404040 1px; border-radius: 20px 20px 0 0; color: #808080; font-size: 20px; font-family: 'Astloch', cursive; line-height: 50px; text-indent: 30px;\">#Camagru</div>";
                msg += "<div style=\"width: calc(100% - 40px); height: auto; padding: 20px; position: relative; float: left; background-color: #202020; border-radius: 0 0 20px 20px; color: #AAAAAA; font-size: 14px; font-family: 'Quicksand', sans-serif; text-align: center; line-height: 30px;\">You have a new notification from Camagru Application! Check it out now! <BR><a style=\"color: #AAAAAA; font-weight: 900;\" href=\"" + Const.URL_APP + "\">Camagru Application Link</a></div>";
                msg += "</div>";
                msg += "</body>";
                msg += "</html>";

                helper.setText(msg, true);
                helper.setTo(email);
                helper.setSubject("New notification from Camagru Application");
                helper.setFrom("camagru.aidan@gmail.com");

                javaMailSender.send(mimeMessage);
            } catch (Exception e) {
                return;
            }
        }
    }

}
