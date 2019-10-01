package com.aidandlim.camagru.dto;

public class User extends Token {

    private long id;
    private String email;
    private String password;
    private String change;
    private String nickname;
    private String bio;
    private boolean isPrivate;
    private boolean isNotificate;
    private String picture;
    private int authorized;
    private String uuid;

    public User() {
        super();
    }

    public User(long id) {
        super();
        this.id = id;
    }

    public User(long id, String email, String password, String change, String nickname, String bio, boolean isPrivate, boolean isNotificate, String picture, int authorized, String uuid) {
        super();
        this.id = id;
        this.email = email;
        this.password = password;
        this.change = change;
        this.nickname = nickname;
        this.bio = bio;
        this.isPrivate = isPrivate;
        this.isNotificate = isNotificate;
        this.picture = picture;
        this.authorized = authorized;
        this.uuid = uuid;
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

    public boolean isPrivate() {
        return isPrivate;
    }

    public void setPrivate(boolean aPrivate) {
        isPrivate = aPrivate;
    }

    public boolean isNotificate() {
        return isNotificate;
    }

    public void setNotificate(boolean notificate) {
        isNotificate = notificate;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public int getAuthorized() {
        return authorized;
    }

    public void setAuthorized(int authorized) {
        this.authorized = authorized;
    }

    public String getUuid() {
        return uuid;
    }

    public void setUuid(String uuid) {
        this.uuid = uuid;
    }
}
