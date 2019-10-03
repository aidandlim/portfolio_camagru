package com.aidandlim.camagru.api;

import com.aidandlim.camagru.dto.Post;
import com.aidandlim.camagru.dto.Reflection;
import com.aidandlim.camagru.service.ReflectionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class ReflectionAPI {

    @Autowired
    ReflectionService service;

    @RequestMapping("/api/reflection/selectAllByPost")
    public ArrayList<Reflection> selectAllByPost(@RequestBody Post post) { return (service.selectAllByPost(post)); }

    @RequestMapping("/api/reflection/insert")
    public boolean insert(@RequestBody Reflection reflection) { return (service.insert(reflection)); }

    @RequestMapping("/api/reflection/delete")
    public boolean delete(@RequestBody Reflection reflection) { return (service.delete(reflection)); }

}
