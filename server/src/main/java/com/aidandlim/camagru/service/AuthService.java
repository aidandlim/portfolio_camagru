package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.AuthDao;
import com.aidandlim.camagru.dto.Token;
import com.aidandlim.camagru.dto.User;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    @Autowired
    SqlSession sqlSession;

    @Autowired
    AuthDao dao;

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
            dao = sqlSession.getMapper(AuthDao.class);
            dao.signup(user);
            mailService.sendMail();
            return true;
        } catch(Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public Token signin(User user) {
        try {
            dao = sqlSession.getMapper(AuthDao.class);
            User result = dao.signin(user);
            return (tokenService.createToken(result));
        } catch (Exception e) {
            e.printStackTrace();
            return (new Token(""));
        }
    }

    @Transactional
    public User select(Token token) {
        try {
            dao = sqlSession.getMapper(AuthDao.class);
            User result = dao.select(tokenService.getIdFromToken(token));
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
            dao = sqlSession.getMapper(AuthDao.class);
            dao.update(user);
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
            dao = sqlSession.getMapper(AuthDao.class);
            if(dao.signin(user) == null)
                return (false);
            dao.updatePassword(user);
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
            dao = sqlSession.getMapper(AuthDao.class);
            dao.updatePrivate(user);
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
            dao = sqlSession.getMapper(AuthDao.class);
            dao.updateNotificate(user);
            return (true);
        } catch (Exception e) {
            e.printStackTrace();
            return (false);
        }
    }

    @Transactional
    public boolean delete(User user) {
        try {
            dao = sqlSession.getMapper(AuthDao.class);
            dao.delete(user);
            return (true);
        } catch (Exception e) {
            e.printStackTrace();
            return (false);
        }
    }

}
