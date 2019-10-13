package com.aidandlim.camagru.service;

import org.apache.commons.io.FileUtils;
import org.apache.ibatis.session.SqlSession;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
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
    TokenService tokenService;

    String PATH = "/Users/aidan/Workspace/portfolio_camagru/data/picture/";

    public byte[] get(String uuid) {
        try {
            return FileUtils.readFileToByteArray(new File(PATH + uuid));
        } catch (Exception e) {
            return null;
        }
    }

    public String uploadWithFile(MultipartFile file) {
        try {
            String name = System.currentTimeMillis() + "-" + UUID.randomUUID().toString();
            byte[] bytes = file.getBytes();
            Path path = Paths.get(PATH + name);
            Files.write(path, bytes);
            return name;
        } catch (Exception e) {
            return null;
        }
    }

    public String uploadWithHash(String file) {
        try {
            String name = System.currentTimeMillis() + "-" + UUID.randomUUID().toString();
            byte bytes[] = Base64.decodeBase64(file);
            FileOutputStream fos = new FileOutputStream(new File(PATH + name));
            fos.write(bytes);
            fos.close();
            return name;
        } catch (Exception e) {
            return null;
        }
    }

    public void delete(String name) {
        try {
            File file = new File(PATH + name);
            file.delete();
        } catch (Exception e) {
            return;
        }
    }

}
