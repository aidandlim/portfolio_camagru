package com.aidandlim.camagru.api;

import com.aidandlim.camagru.dto.Post;
import com.aidandlim.camagru.dto.User;
import com.aidandlim.camagru.service.PostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;

@RestController
public class PostAPI {

    @Autowired
    PostService service;

    @RequestMapping("/api/post/selectAll")
    public ArrayList<Post> selectAll(@RequestBody Post post) { return (service.selectAll(post)); }

    @RequestMapping("/api/post/selectAllByUser")
    public ArrayList<Post> selectAllByUser(@RequestBody User user) { return (service.selectAllByUser(user)); }

    @RequestMapping("/api/post/select")
    public Post select(@RequestBody Post post) { return (service.select(post)); }

    @RequestMapping("/api/post/insert")
    public boolean insert(@RequestBody Post post) { return (service.insert(post)); }

    @RequestMapping("/api/post/delete")
    public boolean delete(@RequestBody Post post) { return (service.delete(post)); }

}
