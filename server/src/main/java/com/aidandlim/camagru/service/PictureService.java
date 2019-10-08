package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.UserDao;
import org.apache.commons.io.FileUtils;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.UUID;

@Service
public class PictureService {

    @Autowired
    SqlSession sqlSession;

    @Autowired
    UserDao userDao;

    @Autowired
    TokenService tokenService;

    @Transactional
    public byte[] get(String uuid) {
        try {
            return FileUtils.readFileToByteArray(new File("/Users/aidan/Workspace/portfolio_camagru/static/" + uuid));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    @Transactional
    public boolean update(String token, MultipartFile file) {
        try {
            userDao = sqlSession.getMapper(UserDao.class);
            String name = System.currentTimeMillis() + "-" + UUID.randomUUID().toString();
            byte[] bytes = file.getBytes();
            Path path = Paths.get("/Users/aidan/Workspace/portfolio_camagru/static/" + name);
            Files.write(path, bytes);
            userDao.updatePicture(name, tokenService.get(token));
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

}
