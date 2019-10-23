package com.aidandlim.camagru.api;

import com.aidandlim.camagru.service.ServerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
public class ServerAPI implements ErrorController {

    @Autowired
    ServerService serverService;

    @RequestMapping(value = { "/", "server", "status" })
    public @ResponseBody String server(HttpServletResponse res) {
        res.setContentType("text/html");
        return serverService.server();
    }

    @RequestMapping("error")
    public @ResponseBody String error(HttpServletResponse res) {
        res.setContentType("text/html");
        return serverService.error();
    }

    @RequestMapping("share")
    public @ResponseBody  String share(HttpServletResponse res, @RequestParam("sid") String sid) {
        res.setContentType("text/html");
        return serverService.share(sid);
    }

    @Override
    public String getErrorPath() {
        return "error";
    }
}
