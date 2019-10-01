package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.PostDao;
import com.aidandlim.camagru.dto.Post;
import com.aidandlim.camagru.dto.Token;
import com.aidandlim.camagru.dto.User;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

@Service
public class PostService {

    @Autowired
    SqlSession sqlSession;

    @Autowired
    PostDao postDao;

    @Autowired
    TokenService tokenService;

    @Transactional
    public ArrayList<Post> selectAll() {
        try {
            postDao = sqlSession.getMapper(PostDao.class);
            return postDao.selectAll();
        } catch (Exception e) {
            e.printStackTrace();
            return (null);
        }
    }

    @Transactional
    public ArrayList<Post> selectAllByUser(User user) {
        try {
            postDao = sqlSession.getMapper(PostDao.class);
            return postDao.selectAllByUser(user);
        } catch (Exception e) {
            e.printStackTrace();
            return (null);
        }
    }

    @Transactional
    public Post select(Post post) {
        if(!tokenService.checkToken(new Token(post.getToken())))
            return null;
        try {
            postDao = sqlSession.getMapper(PostDao.class);
            return postDao.select(post);
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Transactional
    public boolean insert(Post post) {
        if(!tokenService.checkToken(new Token(post.getToken())))
            return false;
        try {
            postDao = sqlSession.getMapper(PostDao.class);
            postDao.insert(post);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public boolean update(Post post) {
        if(!tokenService.checkToken(new Token(post.getToken())))
            return false;
        try {
            postDao = sqlSession.getMapper(PostDao.class);
            postDao.update(post);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public boolean delete(Post post) {
        if(!tokenService.checkToken(new Token(post.getToken())))
            return false;
        try {
            postDao = sqlSession.getMapper(PostDao.class);
            postDao.delete(post);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
