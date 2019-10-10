package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.ReflectionDao;
import com.aidandlim.camagru.dto.Post;
import com.aidandlim.camagru.dto.Reflection;
import com.aidandlim.camagru.dto.Token;
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
    TokenService tokenService;

    @Autowired
    PictureService pictureService;

    @Transactional
    public ArrayList<Reflection> selectAllByPost(Post post) {
        try {
            reflectionDao = sqlSession.getMapper(ReflectionDao.class);
            return reflectionDao.selectAllByPost(post);
        } catch (Exception e) {
            e.printStackTrace();
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
            e.printStackTrace();
            return false;
        }
    }

}
