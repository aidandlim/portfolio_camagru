package com.aidandlim.camagru.service;

import com.aidandlim.camagru.config.Const;
import com.aidandlim.camagru.dto.Sticker;
import org.apache.commons.io.FileUtils;
import org.apache.ibatis.session.SqlSession;
import org.apache.tomcat.util.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.*;
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

    public byte[] get(String uuid) {
        try {
            return FileUtils.readFileToByteArray(new File(Const.PATH_PICTURE + uuid));
        } catch (Exception e) {
            return null;
        }
    }

    public String uploadWithFile(MultipartFile file) {
        try {
            String name = System.currentTimeMillis() + "-" + UUID.randomUUID().toString();
            byte bytes[] = file.getBytes();

             BufferedImage bufferedImage = ImageIO.read(new ByteArrayInputStream(bytes));

            int size = Math.min(bufferedImage.getWidth(), bufferedImage.getHeight());
            BufferedImage combined = new BufferedImage(size, size, BufferedImage.TYPE_INT_ARGB);

            Graphics graphics = combined.getGraphics();

            graphics.drawImage(bufferedImage, (bufferedImage.getWidth() - size) / -2, (bufferedImage.getHeight() - size) / -2, null);

            BufferedImage resizedImage = new BufferedImage(240, 240, Image.SCALE_SMOOTH);
            graphics = resizedImage.createGraphics();
            graphics.drawImage(combined, 0, 0, 240, 240, null);
            graphics.dispose();

            ByteArrayOutputStream result = new ByteArrayOutputStream();
            ImageIO.write(resizedImage, "png", result);

            FileOutputStream fos = new FileOutputStream(new File(Const.PATH_PICTURE + name));
            fos.write(result.toByteArray());
            fos.close();

            return name;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String uploadWithHash(String file, int filter, ArrayList<Sticker> stickers) {
        try {
            String name = System.currentTimeMillis() + "-" + UUID.randomUUID().toString();
            byte bytes[] = mergeImage(Base64.decodeBase64(file), filter, getBytesStickers(stickers), stickers);
            FileOutputStream fos = new FileOutputStream(new File(Const.PATH_PICTURE + name));
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

    public byte[] mergeImage(byte[] image, int filter, ArrayList<byte[]> stickers, ArrayList<Sticker> stickersInfo) {
        try {
            ArrayList<BufferedImage> bufferedImage = new ArrayList<>();

            bufferedImage.add(ImageIO.read(new ByteArrayInputStream(image)));
            for(int i = 0; i < stickers.size(); i++) {
                bufferedImage.add(ImageIO.read(new ByteArrayInputStream(stickers.get(i))));
            }

            int size = Math.min(bufferedImage.get(0).getWidth(), bufferedImage.get(0).getHeight());
            BufferedImage combined = new BufferedImage(size, size, (filter != 1 ? BufferedImage.TYPE_INT_ARGB : BufferedImage.TYPE_BYTE_GRAY));

            Graphics graphics = combined.getGraphics();

            graphics.drawImage(bufferedImage.get(0), (bufferedImage.get(0).getWidth() - size) / -2, (bufferedImage.get(0).getHeight() - size) / -2, null);
            for(int i = 1; i < bufferedImage.size(); i++) {
                graphics.drawImage(
                        bufferedImage.get(i).getScaledInstance(size / 10, size / 10, Image.SCALE_SMOOTH),
                        (int) (stickersInfo.get(i - 1).getX() * size),
                        (int) (stickersInfo.get(i - 1).getY() * size),
                        null);
            }

            if(filter == 2) {
                combined = setSephiaFilter(combined, size);
            }

            BufferedImage resizedImage = new BufferedImage(960, 960, Image.SCALE_SMOOTH);
            graphics = resizedImage.createGraphics();
            graphics.drawImage(combined, 0, 0, 960, 960, null);
            graphics.dispose();

            ByteArrayOutputStream result = new ByteArrayOutputStream();
            ImageIO.write(resizedImage, "png", result);
            return result.toByteArray();
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public BufferedImage setSephiaFilter(BufferedImage image, int size) {
        for(int y = 0; y < size; y++){
            for(int x = 0; x < size; x++){
                int p = image.getRGB(x,y);
                int a = (p >> 24) &0xff;
                int r = (p >> 16) &0xff;
                int g = (p >> 8) &0xff;
                int b = p&0xff;

                int tr = (int) (0.393 * r + 0.769 * g + 0.189 * b);
                int tg = (int) (0.349 * r + 0.686 * g + 0.168 * b);
                int tb = (int) (0.272 * r + 0.534 * g + 0.131 * b);

                r = tr > 255 ? 255 : tr;
                g = tg > 255 ? 255 : tg;
                b = tb > 255 ? 255 : tb;
                p = (a << 24) | (r << 16) | (g << 8) | b;

                image.setRGB(x, y, p);
            }
        }
        return image;
    }

    public void delete(String name) {
        try {
            File file = new File(Const.PATH_PICTURE + name);
            file.delete();
        } catch (Exception e) {
            return;
        }
    }

}
