package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.PostDao;
import com.aidandlim.camagru.dto.Post;
import com.aidandlim.camagru.dto.Token;
import com.aidandlim.camagru.dto.User;
import org.apache.ibatis.session.SqlSession;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.UUID;

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
            ArrayList<Post> dto = postDao.selectAll(token.getToken().equals("") ? -1 : tokenService.getIdFromToken(token));
            for(int i = 0; i < dto.size(); i++){
                dto.get(i).setUser_picture(pictureService.getPicture(dto.get(i).getUser_picture()));
                dto.get(i).setPicture(pictureService.getPicture(dto.get(i).getPicture()));
            }
            return dto;
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
            dto.setPicture(pictureService.getPicture(dto.getPicture()));
            dto.setUser_picture(pictureService.getPicture(dto.getUser_picture()));
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
        if(!tokenService.checkToken(new Token(post.getToken())))
            return false;
        try {
            postDao = sqlSession.getMapper(PostDao.class);
            post.setPicture(uploadPicture(post.getPicture()));
            postDao.insert(post);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public String uploadPicture(String file) {
        try {
            String name = System.currentTimeMillis() + "-" + UUID.randomUUID().toString();
            byte bytes[] = Base64.decodeBase64(file);
            FileOutputStream fos = new FileOutputStream(new File("/Users/aidan/Workspace/portfolio_camagru/static/" + name));
            fos.write(bytes);
            fos.close();
            return name;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
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
