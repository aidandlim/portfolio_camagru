package com.aidandlim.camagru;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CamagruApplication {

    static String URL = "https://10.10.136.78:8443/";

    public static void main(String[] args) {
        SpringApplication.run(CamagruApplication.class, args);
    }

}
