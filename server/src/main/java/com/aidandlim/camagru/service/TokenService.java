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
        System.out.println("GENERATE " + session.getId() + " >> " + session.getAttribute("token"));
        return token;
    }

    public long get(String token) {
        System.out.println("GET " + session.getId() + " >> " + session.getAttribute(token));
        return session.getAttribute(token) == null ? -1 : (long) session.getAttribute(token);
    }

}