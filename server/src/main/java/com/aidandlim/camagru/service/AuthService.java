package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.AuthDao;
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
    public User isLogin(HttpServletRequest req) {
        HttpSession session = req.getSession();
        User result = new User(-1);
        if(session.getAttribute("user_id") != null) {
            result.setId(Long.parseLong((String) session.getAttribute("user_id")));
            result.setEmail((String) session.getAttribute("user_email"));
            result.setNickname((String) session.getAttribute("user_nickname"));
        }
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
    public boolean signin(HttpServletRequest req, User user) {
        HttpSession session = req.getSession();
        try {
            dao = sqlSession.getMapper(AuthDao.class);
            User result = dao.signin(user);
            if(result != null) {
                session.setAttribute("user_id", result.getId());
                session.setAttribute("user_email", result.getEmail());
                session.setAttribute("user_nickname", result.getNickname());
                return (true);
            }
            return (false);
        } catch (Exception e) {
            return (false);
        }
    }

}
