package com.aidandlim.camagru.dto;

public class Token {

    private String token;
    private int status;

    public Token() {
    }

    public Token(String token) {
        this.token = token;
    }

    public Token(int status) {
        this.status = status;
    }

    public Token(String token, int status) {
        this.token = token;
        this.status = status;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public int getStatus() {
        return status;
    }

    public void setStatus(int status) {
        this.status = status;
    }
}
