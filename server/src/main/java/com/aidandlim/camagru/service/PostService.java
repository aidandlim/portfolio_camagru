package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.PostDao;
import com.aidandlim.camagru.dto.Post;
import com.aidandlim.camagru.dto.Sticker;
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
    public ArrayList<Post> selectAll(Post post) {
        try {
            postDao = sqlSession.getMapper(PostDao.class);
            return postDao.selectAll(post.getToken().equals("") ? -1 : tokenService.get(post.getToken()), post.getCall());
        } catch (Exception e) {
            return null;
        }
    }

    @Transactional
    public ArrayList<Post> selectAllByUser(User user) {
        try {
            postDao = sqlSession.getMapper(PostDao.class);
            return postDao.selectAllByUser(user);
        } catch (Exception e) {
            return null;
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
            return null;
        }
    }

    @Transactional
    public boolean insert(Post post) {
        if(tokenService.get(post.getToken()) == -1)
            return false;
        try {
            postDao = sqlSession.getMapper(PostDao.class);
            post.setPicture(pictureService.uploadWithHash(post.getPicture(), post.getFilter(), post.getStickers()));
            postDao.insert(post);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    @Transactional
    public boolean delete(Post post) {
        if(tokenService.get(post.getToken()) == -1)
            return false;
        try {
            postDao = sqlSession.getMapper(PostDao.class);
            pictureService.delete(postDao.select(post).getPicture());
            postDao.delete(post);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

}
