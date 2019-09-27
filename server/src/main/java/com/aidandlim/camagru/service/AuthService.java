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

    @Transactional
    public boolean isLogin(Token token) {
        try {
            return (tokenService.checkToken(token));
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public boolean signup(User user) {
        try {
            dao = sqlSession.getMapper(AuthDao.class);
            dao.signup(user);
            return true;
        } catch(Exception e) {
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
            return (new Token(""));
        }
    }

    @Transactional
    public User select(Token token) {
        try {
            dao = sqlSession.getMapper(AuthDao.class);
            User result = dao.selectById(tokenService.getIdFromToken(token));
            return (result);
        } catch (Exception e) {
            return (null);
        }
    }

}
