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

    @Transactional
    public User select(Token token) {
        try {
            userDao = sqlSession.getMapper(UserDao.class);
            User result = userDao.select(tokenService.getIdFromToken(token));
            result.setPicture(getPicture(result.getPicture()));
            return (result);
        } catch (Exception e) {
            e.printStackTrace();
            return (null);
        }
    }

    @Transactional
    public String getPicture(String uuid) {
        try {
            byte[] fileContent = FileUtils.readFileToByteArray(new File("/Users/aidan/Workspace/portfolio_camagru/static/" + uuid));
            String encodedString = Base64.getEncoder().encodeToString(fileContent);
            return (encodedString);
        } catch (Exception e) {
            e.printStackTrace();
            return (null);
        }
    }

    @Transactional
    public boolean update(User user) {
        if(!tokenService.checkToken(new Token(user.getToken())))
            return false;
        try {
            userDao = sqlSession.getMapper(UserDao.class);
            userDao.update(user);
            User temp = userDao.select(tokenService.getIdFromToken(new Token(user.getToken())));
            if(!temp.getEmail().equals(user.getEmail())) {
                verifyDao = sqlSession.getMapper(VerifyDao.class);
                user.setUuid(UUID.randomUUID().toString().replace("-", ""));
                mailService.sendVerifyMail(user);
                verifyDao.update(temp);
                verifyDao.insert(user);
            }
            return (true);
        } catch (Exception e) {
            e.printStackTrace();
            return (false);
        }
    }

    @Transactional
    public boolean updatePicture(String token, MultipartFile file) {
        try {
            userDao = sqlSession.getMapper(UserDao.class);
            String name = System.currentTimeMillis() + "-" + UUID.randomUUID().toString();
            byte[] bytes = file.getBytes();
            Path path = Paths.get("/Users/aidan/Workspace/portfolio_camagru/static/" + name);
            Files.write(path, bytes);
            userDao.updatePicture(name, tokenService.getIdFromToken(new Token(token)));
            return (true);
        } catch (Exception e) {
            e.printStackTrace();
            return (false);
        }
    }

    @Transactional
    public boolean updatePassword(User user) {
        if(!tokenService.checkToken(new Token(user.getToken())))
            return false;
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
    public boolean updatePrivate(User user) {
        if(!tokenService.checkToken(new Token(user.getToken())))
            return false;
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
    public boolean updateNotificate(User user) {
        if(!tokenService.checkToken(new Token(user.getToken())))
            return false;
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
