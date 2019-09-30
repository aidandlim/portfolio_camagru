package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.AuthDao;
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
    VerifyDao verifyDao;

    @Autowired
    TokenService tokenService;

    @Autowired
    MailService mailService;

    @Transactional
    public boolean isLogin(Token token) {
        try {
            return (token.getToken().equals("") ? false : tokenService.checkToken(token));
        } catch (Exception e) {
            e.printStackTrace();
            return false;
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
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public String verify(User user) {
        try {
            verifyDao = sqlSession.getMapper(VerifyDao.class);

            if(verifyDao.select(user).getUuid().equals(user.getUuid())) {
                verifyDao.update(user);
                verifyDao.delete(user);
            } else {
                return "Fail";
            }
            return "Success";
        } catch(Exception e) {
            e.printStackTrace();
            return "Fail";
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
        } catch(Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public Token signin(User user) {
        try {
            authDao = sqlSession.getMapper(AuthDao.class);
            User result = authDao.signin(user);
            if(result.getAuthorized() == 1) {
                return new Token(tokenService.createToken(result).getToken(), 1);
            } else {
                return new Token(0);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new Token("");
        }
    }

    @Transactional
    public User select(Token token) {
        try {
            authDao = sqlSession.getMapper(AuthDao.class);
            User result = authDao.select(tokenService.getIdFromToken(token));
            return (result);
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
            authDao = sqlSession.getMapper(AuthDao.class);
            authDao.update(user);
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
            if(authDao.signin(user) == null)
                return (false);
            authDao.updatePassword(user);
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
            authDao = sqlSession.getMapper(AuthDao.class);
            authDao.updatePrivate(user);
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
            authDao = sqlSession.getMapper(AuthDao.class);
            authDao.updateNotificate(user);
            return (true);
        } catch (Exception e) {
            e.printStackTrace();
            return (false);
        }
    }

    @Transactional
    public boolean delete(User user) {
        try {
            authDao = sqlSession.getMapper(AuthDao.class);
            authDao.delete(user);
            return (true);
        } catch (Exception e) {
            e.printStackTrace();
            return (false);
        }
    }

}
