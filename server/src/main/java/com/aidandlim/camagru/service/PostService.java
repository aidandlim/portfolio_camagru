package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.PostDao;
import com.aidandlim.camagru.dto.Post;
import com.aidandlim.camagru.dto.Token;
import com.aidandlim.camagru.dto.User;
import org.apache.commons.io.FileUtils;
import org.apache.ibatis.session.SqlSession;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
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

    @Transactional
    public ArrayList<Post> selectAll(Token token) {
        try {
            postDao = sqlSession.getMapper(PostDao.class);
            ArrayList<Post> dto = postDao.selectAll(token.getToken().equals("") ? -1 : tokenService.getIdFromToken(token));
            for(int i = 0; i < dto.size(); i++){
                dto.get(i).setPicture(getPicture(dto.get(i).getPicture()));
            }
            return dto;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Transactional
    public String getPicture(String uuid) {
        try {
            byte[] fileContent = FileUtils.readFileToByteArray(new File("/Users/aidan/Workspace/portfolio_camagru/static/" + uuid));
            String encodedString = java.util.Base64.getEncoder().encodeToString(fileContent);
            return (encodedString.replaceFirst("dataimage/jpegbase64", ""));
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
