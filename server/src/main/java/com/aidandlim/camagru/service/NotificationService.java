package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.NotificationDao;
import com.aidandlim.camagru.dto.Notification;
import com.aidandlim.camagru.dto.Token;
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
            return notificationDao.selectAll(tokenService.get(token.getToken()));
        } catch (Exception e) {
            return null;
        }
    }

}
