package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.AuthDao;
import com.aidandlim.camagru.dao.UserDao;
import com.aidandlim.camagru.dao.VerifyDao;
import com.aidandlim.camagru.dto.Token;
import com.aidandlim.camagru.dto.User;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.UUID;

@Service
public class AuthService {

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
    public boolean isLogin(Token token) {
        try {
            if(tokenService.get(token.getToken()) != -1) {
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public Token signin(User user) {
        try {
            authDao = sqlSession.getMapper(AuthDao.class);
            User result = authDao.signin(user);
            if(result.getAuthorized() == 1) {
                return new Token(tokenService.generate(result), 1);
            } else {
                return new Token(0);
            }
        } catch (Exception e) {
            return new Token(-1);
        }
    }

    @Transactional
    public boolean signup(User user) {
        try {
            authDao = sqlSession.getMapper(AuthDao.class);
            verifyDao = sqlSession.getMapper(VerifyDao.class);
            authDao.signup(user);
            user.setUuid(UUID.randomUUID().toString().replace("-", ""));
            mailService.sendVerifyMail(user);
            verifyDao.insert(user);
            return true;
        } catch(Exception e) {
            return false;
        }
    }

    @Transactional
    public boolean verify(User user) {
        try {
            verifyDao = sqlSession.getMapper(VerifyDao.class);
            if(verifyDao.select(user).getUuid().equals(user.getUuid())) {
                verifyDao.update(user);
                verifyDao.delete(user);
            } else {
                return false;
            }
            return true;
        } catch(Exception e) {
            return false;
        }
    }

    @Transactional
    public boolean verifyAgain(User user) {
        try {
            verifyDao = sqlSession.getMapper(VerifyDao.class);
            verifyDao.delete(user);
            user.setUuid(UUID.randomUUID().toString().replace("-", ""));
            mailService.sendVerifyMail(user);
            verifyDao.insert(user);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public boolean forgot(User user) {
        try {
            userDao = sqlSession.getMapper(UserDao.class);
            if(userDao.selectByEmail(user) != null) {
                user.setUuid(UUID.randomUUID().toString().replace("-", ""));
                user.setChange(user.getUuid());
                userDao.updatePassword(user);
                mailService.sendForgotMail(user);
                return true;
            } else {
                return false;
            }
        } catch (Exception e) {
            return false;
        }
    }

}
