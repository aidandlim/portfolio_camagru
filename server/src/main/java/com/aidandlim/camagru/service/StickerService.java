package com.aidandlim.camagru.service;

import com.aidandlim.camagru.config.Const;
import org.apache.commons.io.FileUtils;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.File;
import java.util.ArrayList;

@Service
public class StickerService {

    public byte[] get(String name) {
        try {
            return FileUtils.readFileToByteArray(new File(Const.PATH_STICKER + name));
        } catch (Exception e) {
            return null;
        }
    }

    @Transactional
    public ArrayList<String> selectAll() {
        try {
            File dir = new File(Const.PATH_STICKER);
            File[] files = dir.listFiles();
            ArrayList<String> dto = new ArrayList<>();
            for(int i = 0; i < files.length; i++) {
                if(!files[i].getName().equals(".DS_Store"))
                    dto.add(files[i].getName());
            }
            return dto;
        } catch (Exception e) {
            return null;
        }
    }

}
