package com.aidandlim.camagru.api;

import com.aidandlim.camagru.service.StickerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;

@RestController
public class StickerAPI {

    @Autowired
    StickerService service;

    @RequestMapping("/api/sticker")
    public @ResponseBody byte[] sticker(@RequestParam("s") String sticker) { return (service.get(sticker)); }

    @RequestMapping("/api/sticker/selectAll")
    public ArrayList<String> selectAll() { return (service.selectAll()); }

}
