package com.aidandlim.camagru.api;

import com.aidandlim.camagru.service.PictureService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
public class PictureAPI {

    @Autowired
    PictureService pictureService;

    @RequestMapping("/api/picture")
    public @ResponseBody byte[] picture(@RequestParam("p") String picture) { return (pictureService.get(picture)); }

}
