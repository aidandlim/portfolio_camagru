package com.aidandlim.camagru.dto;

import java.util.Date;

public class Reflection extends Token {

    private long id;
    private long user_id;
    private long post_id;
    private Date time;

    private String user_nickname;
    private String user_picture;

    public Reflection() {
        super();
    }

    public Reflection(long id, long user_id, long post_id, Date time, String user_nickname, String user_picture) {
        super();
        this.id = id;
        this.user_id = user_id;
        this.post_id = post_id;
        this.time = time;
        this.user_nickname = user_nickname;
        this.user_picture = user_picture;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public long getUser_id() {
        return user_id;
    }

    public void setUser_id(long user_id) {
        this.user_id = user_id;
    }

    public long getPost_id() {
        return post_id;
    }

    public void setPost_id(long post_id) {
        this.post_id = post_id;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public String getUser_nickname() {
        return user_nickname;
    }

    public void setUser_nickname(String user_nickname) {
        this.user_nickname = user_nickname;
    }

    public String getUser_picture() {
        return user_picture;
    }

    public void setUser_picture(String user_picture) {
        this.user_picture = user_picture;
    }
}
