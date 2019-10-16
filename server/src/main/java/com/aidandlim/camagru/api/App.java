package com.aidandlim.camagru.api;

import com.aidandlim.camagru.dto.User;
import com.aidandlim.camagru.service.AuthService;
import com.aidandlim.camagru.service.ShareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletResponse;

@Controller
public class App {

    @Autowired
    AuthService authService;

    @Autowired
    ShareService shareService;

    @RequestMapping("/")
    public @ResponseBody String check() { return "Restful API connection is successful!"; }

    @RequestMapping("verify")
    public @ResponseBody String verify(User user) { return (authService.verify(user)); }

    @RequestMapping("share")
    public @ResponseBody String share(HttpServletResponse res, @RequestParam("p") String id) {
        res.setContentType("text/html");
        return shareService.share(id);
    }

}
