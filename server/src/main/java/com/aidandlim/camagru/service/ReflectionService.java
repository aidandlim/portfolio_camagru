package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.PostDao;
import com.aidandlim.camagru.dao.ReflectionDao;
import com.aidandlim.camagru.dto.Post;
import com.aidandlim.camagru.dto.Reflection;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class ReflectionService {

    @Autowired
    SqlSession sqlSession;

    @Autowired
    ReflectionDao reflectionDao;

    @Autowired
    PostDao postDao;

    @Autowired
    TokenService tokenService;

    @Autowired
    PictureService pictureService;

    @Autowired
    MailService mailService;

    @Transactional
    public ArrayList<Reflection> selectAllByPost(Post post) {
        try {
            reflectionDao = sqlSession.getMapper(ReflectionDao.class);
            return reflectionDao.selectAllByPost(post);
        } catch (Exception e) {
            return null;
        }
    }

    @Transactional
    public boolean insert(Reflection reflection) {
        if(tokenService.get(reflection.getToken()) == -1)
            return false;
        try {
            reflectionDao = sqlSession.getMapper(ReflectionDao.class);
            if(reflectionDao.select(reflection) == null) {
                mailService.sendNotificationMail(postDao.selectUserEmailByPostId(reflection.getPost_id(), tokenService.get(reflection.getToken())));
                reflectionDao.insert(reflection);
            } else {
                reflectionDao.delete(reflection);
            }
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public boolean delete(Reflection reflection) {
        if(tokenService.get(reflection.getToken()) == -1)
            return false;
        try {
            reflectionDao = sqlSession.getMapper(ReflectionDao.class);
            reflectionDao.delete(reflection);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
