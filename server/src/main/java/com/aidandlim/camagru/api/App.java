package com.aidandlim.camagru.api;

import com.aidandlim.camagru.dto.User;
import com.aidandlim.camagru.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class App {

    @Autowired
    AuthService service;

    @RequestMapping("/")
    public @ResponseBody String check() { return "Restful API connection is successful!"; }

    @RequestMapping("verify")
    public @ResponseBody String verify(User user) { return (service.verify(user)); }

}
