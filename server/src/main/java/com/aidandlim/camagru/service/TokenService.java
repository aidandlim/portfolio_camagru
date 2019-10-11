package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dto.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import javax.servlet.http.HttpSession;
import java.util.UUID;

@Service
public class TokenService {

    @Autowired
    private HttpSession session;

    public String generate(User user) {
        String token = UUID.randomUUID().toString() + System.currentTimeMillis();
        session.setAttribute(token, user.getId());
        session.setMaxInactiveInterval(60 * 60);
        return token;
    }

    public long get(String token) {
        return session.getAttribute(token) == null ? -1 : (long) session.getAttribute(token);
    }

}