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

import java.io.File;
import java.io.FileOutputStream;
import java.util.ArrayList;
import java.util.UUID;

@Service
public class PictureService {

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

}
