package com.aidandlim.camagru.config;

import java.net.InetAddress;
import java.net.UnknownHostException;
import java.nio.file.Paths;

public class Const {

    static String absolutePath = Paths.get("").toAbsolutePath().toString() + "/src/main/resources";
    static String ip;

    static {
        try {
            ip = InetAddress.getLocalHost().toString();
        } catch (UnknownHostException e) {

        }
    }

    /* AWS */
    /*
    public static String URL_SERVER = "https://52.53.219.65:8443/";
    public static String URL_APP = "https://52.53.219.65:3000/";

    public static String PATH_PICTURE = "/home/ubuntu/camagru/data/picture/";
    public static String PATH_STICKER = "/home/ubuntu/camagru/data/sticker/";
    */

    /* LOCAL */
    /*
    public static String URL_SERVER = "https://localhost:8443/";
    public static String URL_APP = "https://localhost:443/";

    public static String PATH_PICTURE = "/Users/aidan/Workspace/portfolio_camagru/data/picture/";
    public static String PATH_STICKER = "/Users/aidan/Workspace/portfolio_camagru/data/sticker/";
    */

    /* 42 */
    /* */
    public static String URL_SERVER = "https://" + ip + ":8443/";
    public static String URL_APP = "https://" + ip + ":3000/";

    public static String PATH_PICTURE = absolutePath + "/data/picture/";
    public static String PATH_STICKER = absolutePath + "/data/sticker/";
    /* */

}
