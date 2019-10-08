package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.AuthDao;
import com.aidandlim.camagru.dao.UserDao;
import com.aidandlim.camagru.dao.VerifyDao;
import com.aidandlim.camagru.dto.Token;
import com.aidandlim.camagru.dto.User;
import org.apache.commons.io.FileUtils;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
public class UserService {

    @Autowired
    SqlSession sqlSession;

    @Autowired
    AuthDao authDao;

    @Autowired
    UserDao userDao;

    @Autowired
    VerifyDao verifyDao;

    @Autowired
    TokenService tokenService;

    @Autowired
    MailService mailService;

    @Autowired
    PictureService pictureService;

    @Transactional
    public User select(Token token) {
        try {
            userDao = sqlSession.getMapper(UserDao.class);
            return userDao.select(tokenService.get(token.getToken()));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Transactional
    public boolean update(User user) {
        try {
            userDao = sqlSession.getMapper(UserDao.class);
            User temp = userDao.select(tokenService.get(user.getToken()));
            if(!temp.getEmail().equals(user.getEmail())) {
                verifyDao = sqlSession.getMapper(VerifyDao.class);
                user.setUuid(UUID.randomUUID().toString().replace("-", ""));
                mailService.sendVerifyMail(user);
                verifyDao.update(temp);
                verifyDao.insert(user);
            }
            userDao.update(user);
            return (true);
        } catch (Exception e) {
            e.printStackTrace();
            return (false);
        }
    }

    @Transactional
    public boolean updatePassword(User user) {
        try {
            authDao = sqlSession.getMapper(AuthDao.class);
            userDao = sqlSession.getMapper(UserDao.class);
            if(authDao.signin(user) == null)
                return (false);
            userDao.updatePassword(user);
            return (true);
        } catch (Exception e) {
            e.printStackTrace();
            return (false);
        }
    }

    @Transactional
    public boolean updateIsPrivate(User user) {
        try {
            userDao = sqlSession.getMapper(UserDao.class);
            userDao.updatePrivate(user);
            return (true);
        } catch (Exception e) {
            e.printStackTrace();
            return (false);
        }
    }

    @Transactional
    public boolean updateIsNotificate(User user) {
        try {
            userDao = sqlSession.getMapper(UserDao.class);
            userDao.updateNotificate(user);
            return (true);
        } catch (Exception e) {
            e.printStackTrace();
            return (false);
        }
    }

    @Transactional
    public boolean delete(User user) {
        try {
            userDao = sqlSession.getMapper(UserDao.class);
            userDao.delete(user);
            return (true);
        } catch (Exception e) {
            e.printStackTrace();
            return (false);
        }
    }

}
