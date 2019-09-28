package com.aidandlim.camagru.api;

import com.aidandlim.camagru.dto.Token;
import com.aidandlim.camagru.dto.User;
import com.aidandlim.camagru.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AuthAPI {

    @Autowired
    AuthService service;

    @RequestMapping("/api/user/isLogin")
    public boolean isLogin(@RequestBody Token token) { return (service.isLogin(token)); }

    @RequestMapping("/api/user/signin")
    public Token signin(@RequestBody User user) {
        return (service.signin(user));
    }

    @RequestMapping("/api/user/signup")
    public boolean signup(@RequestBody User user) {
        return (service.signup(user));
    }

    @RequestMapping("/api/user/selectById")
    public User selectById(@RequestBody Token token) { return (service.selectById(token)); }

    @RequestMapping("/api/user/update")
    public boolean update(@RequestBody User user) { return (service.update(user)); }

    @RequestMapping("/api/user/updatePassword")
    public boolean updatePassword(@RequestBody User user) { return (service.updatePassword(user)); }
    
}
