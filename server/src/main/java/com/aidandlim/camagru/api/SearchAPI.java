package com.aidandlim.camagru.api;

import com.aidandlim.camagru.dto.Post;
import com.aidandlim.camagru.dto.Search;
import com.aidandlim.camagru.dto.User;
import com.aidandlim.camagru.service.SearchService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class SearchAPI {

    @Autowired
    SearchService service;

    @RequestMapping("/api/search/select")
    public Search select(@RequestBody User user) { return (service.select(user)); }

    @RequestMapping("/api/search/selectAllUserByKeyword")
    public ArrayList<User> selectAllUserByKeyword(@RequestBody Search search) { return (service.selectAllUserByKeyword(search)); }

    @RequestMapping("/api/search/selectAllPostByKeyword")
    public ArrayList<Post> selectAllPostByKeyword(@RequestBody Search search) { return (service.selectAllPostByKeyword(search)); }

}
