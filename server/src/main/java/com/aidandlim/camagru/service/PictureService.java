package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.UserDao;
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
import java.util.UUID;

@Service
public class PictureService {

    @Autowired
    SqlSession sqlSession;

    @Autowired
    UserDao userDao;

    @Autowired
    TokenService tokenService;

    public byte[] get(String uuid) {
        try {
            return FileUtils.readFileToByteArray(new File("/Users/aidan/Workspace/portfolio_camagru/static/" + uuid));
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

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

    public String upload(String file) {
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

}
