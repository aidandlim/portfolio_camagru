package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.NotificationDao;
import com.aidandlim.camagru.dto.*;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class NotificationService {

    @Autowired
    SqlSession sqlSession;

    @Autowired
    NotificationDao notificationDao;

    @Autowired
    TokenService tokenService;

    @Autowired
    PictureService pictureService;

    @Transactional
    public ArrayList<Notification> selectAll(Token token) {
        try {
            notificationDao = sqlSession.getMapper(NotificationDao.class);
            ArrayList<Notification> dto = notificationDao.selectAll(tokenService.getIdFromToken(token));
            for(int i = 0; i < dto.size(); i++){
                dto.get(i).setUser_picture(pictureService.getPicture(dto.get(i).getUser_picture()));
            }
            return dto;
        } catch (Exception e) {
            e.printStackTrace();
            return (null);
        }
    }

}
