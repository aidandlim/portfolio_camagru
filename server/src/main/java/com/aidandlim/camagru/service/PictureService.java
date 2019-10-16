package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dto.Sticker;
import org.apache.commons.io.FileUtils;
import org.apache.ibatis.session.SqlSession;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
import java.awt.geom.AffineTransform;
import java.awt.image.BufferedImage;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.UUID;

@Service
public class PictureService {

    @Autowired
    SqlSession sqlSession;

    @Autowired
    StickerService stickerService;

    String PATH = "/Users/aidan/Workspace/portfolio_camagru/data/picture/";

    public byte[] get(String uuid) {
        try {
            return FileUtils.readFileToByteArray(new File(PATH + uuid));
        } catch (Exception e) {
            return null;
        }
    }

    public String uploadWithFile(MultipartFile file, ArrayList<Sticker> stickers) {
        try {
            String name = System.currentTimeMillis() + "-" + UUID.randomUUID().toString();
            byte bytes[] = stickers != null ? mergeImage(file.getBytes(), getBytesStickers(stickers), stickers) : file.getBytes();
            Path path = Paths.get(PATH + name);
            Files.write(path, bytes);
            return name;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String uploadWithHash(String file, ArrayList<Sticker> stickers) {
        try {
            String name = System.currentTimeMillis() + "-" + UUID.randomUUID().toString();
            byte bytes[] = mergeImage(Base64.decodeBase64(file), getBytesStickers(stickers), stickers);
            FileOutputStream fos = new FileOutputStream(new File(PATH + name));
            fos.write(bytes);
            fos.close();
            return name;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public ArrayList<byte[]> getBytesStickers(ArrayList<Sticker> stickers) {
        try {
            ArrayList<byte[]> result = new ArrayList<>();
            for(int i = 0; i < stickers.size(); i++) {
                result.add(stickerService.get(stickers.get(i).getName()));
            }
            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public byte[] mergeImage(byte[] image, ArrayList<byte[]> stickers, ArrayList<Sticker> stickersInfo) {
        try {
            ArrayList<BufferedImage> bufferedImage = new ArrayList<>();

            bufferedImage.add(ImageIO.read(new ByteArrayInputStream(image)));
            for(int i = 0; i < stickers.size(); i++) {
                bufferedImage.add(ImageIO.read(new ByteArrayInputStream(stickers.get(i))));
            }

            int size = Math.min(bufferedImage.get(0).getWidth(), bufferedImage.get(0).getHeight());
            BufferedImage combined = new BufferedImage(size, size, BufferedImage.TYPE_INT_ARGB);

            Graphics g  = combined.getGraphics();

            g.drawImage(bufferedImage.get(0), (bufferedImage.get(0).getWidth() - size) / -2, (bufferedImage.get(0).getHeight() - size) / -2, null);
            for(int i = 1; i < bufferedImage.size(); i++) {
                g.drawImage(
                        bufferedImage.get(i).getScaledInstance(size / 10, size  / 10, Image.SCALE_SMOOTH),
                        (int) (stickersInfo.get(i - 1).getX() * size),
                        (int) (stickersInfo.get(i - 1).getY() * size),
                        null);
            }
            g.dispose();

            ByteArrayOutputStream result = new ByteArrayOutputStream();
            ImageIO.write(combined, "png", result);
            return result.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
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
