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

    @Autowired
    PictureService pictureService;

    @Autowired
    ReflectionService reflectionService;

    @Autowired
    CommentService commentService;

    @Transactional
    public ArrayList<Post> selectAll(Token token) {
        try {
            postDao = sqlSession.getMapper(PostDao.class);
            return postDao.selectAll(token.getToken().equals("") ? -1 : tokenService.get(token.getToken()));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
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
        try {
            postDao = sqlSession.getMapper(PostDao.class);
            Post dto = postDao.select(post);
            dto.setLikes(reflectionService.selectAllByPost(post));
            dto.setComments(commentService.selectAllByPost(post));
            return dto;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Transactional
    public boolean insert(Post post) {
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
