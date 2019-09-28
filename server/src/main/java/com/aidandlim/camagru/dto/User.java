package com.aidandlim.camagru.dto;

public class User extends Token {

    private long id;
    private String email;
    private String password;
    private String change;
    private String nickname;
    private String bio;

    public User() {
        super();
    }

    public User(long id) {
        super();
        this.id = id;
    }

    public User(long id, String email, String password, String change, String nickname, String bio) {
        super();
        this.id = id;
        this.email = email;
        this.password = password;
        this.change = change;
        this.nickname = nickname;
        this.bio = bio;
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

    public String getChange() {
        return change;
    }

    public void setChange(String change) {
        this.change = change;
    }

    public String getNickname() {
        return nickname;
    }

    public void setNickname(String nickname) {
        this.nickname = nickname;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
    }
}
