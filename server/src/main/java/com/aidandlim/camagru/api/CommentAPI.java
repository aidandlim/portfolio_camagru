package com.aidandlim.camagru.api;

import com.aidandlim.camagru.dto.Comment;
import com.aidandlim.camagru.dto.Post;
import com.aidandlim.camagru.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class CommentAPI {

    @Autowired
    CommentService service;

    @RequestMapping("/api/comment/selectAllByPost")
    public ArrayList<Comment> selectAllByPost(@RequestBody Post post) { return (service.selectAllByPost(post)); }

    @RequestMapping("/api/comment/insert")
    public boolean insert(@RequestBody Comment comment) { return (service.insert(comment)); }

    @RequestMapping("/api/comment/delete")
    public boolean delete(@RequestBody Comment comment) { return (service.delete(comment)); }

}
