package com.aidandlim.camagru.config;

import java.nio.file.Paths;

public class Const {

    static String absolutePath = Paths.get("").toAbsolutePath().toString() + "/src/main/resources";

    /* SERVICE */
    /* */
    public static String URL_SERVER = "https://camagru.aidandlim.com:8443/";
    public static String URL_APP = "https://camagru.aidandlim.com/";

    public static String PATH_PICTURE = absolutePath + "/data/picture/";
    public static String PATH_STICKER = absolutePath + "/data/sticker/";
    /* */

    /* LOCAL */
    /*
    public static String URL_SERVER = "https://localhost:8443/";
    public static String URL_APP = "https://localhost:3000/";

    public static String PATH_PICTURE = absolutePath + "/data/picture/";
    public static String PATH_STICKER = absolutePath + "/data/sticker/";
    */

}
