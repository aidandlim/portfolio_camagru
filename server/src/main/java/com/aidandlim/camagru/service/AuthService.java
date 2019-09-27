package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.AuthDao;
import com.aidandlim.camagru.dto.Token;
import com.aidandlim.camagru.dto.User;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Service
public class AuthService {

    @Autowired
    SqlSession sqlSession;

    @Autowired
    AuthDao dao;

    @Transactional
    public User isLogin(Token token) {
        User result = new User(-1);
        return result;
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
            if(result != null) {
                result.setToken("");
                return (result);
            }
            return (new Token("null"));
        } catch (Exception e) {
            return (new Token("null"));
        }
    }

}
