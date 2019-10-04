package com.aidandlim.camagru.api;

import com.aidandlim.camagru.dto.Notification;
import com.aidandlim.camagru.dto.Token;
import com.aidandlim.camagru.service.NotificationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class NotificationAPI {

    @Autowired
    NotificationService service;

    @RequestMapping("/api/notification/selectAll")
    public ArrayList<Notification> selectAll(@RequestBody Token token) { return (service.selectAll(token)); }

}
