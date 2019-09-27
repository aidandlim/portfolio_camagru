package com.aidandlim.camagru.dto;

public class User extends Token {

    private long id;
    private String email;
    private String password;
    private String nickname;

    public User() {
        super();
    }

    public User(long id) {
        super();
        this.id = id;
    }

    public User(long id, String email, String password, String nickname) {
        super();
        this.id = id;
        this.email = email;
        this.password = password;
        this.nickname = nickname;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }
}
