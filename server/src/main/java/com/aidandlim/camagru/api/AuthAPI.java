package com.aidandlim.camagru.api;

import com.aidandlim.camagru.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthAPI {

    @Autowired
    AuthService service;
    
}
