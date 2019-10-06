package com.aidandlim.camagru.api;

import com.aidandlim.camagru.dto.Search;
import com.aidandlim.camagru.dto.User;
import com.aidandlim.camagru.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SearchAPI {

    @Autowired
    SearchService service;

    @RequestMapping("/api/search/select")
    public Search select(@RequestBody User user) { return (service.select(user)); }

}
