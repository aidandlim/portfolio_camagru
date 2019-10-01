package com.aidandlim.camagru.dto;

import java.util.Date;

public class Post extends Token {

    private long id;
    private long user_id;
    private String picture;
    private String content;
    private String location;
    private String together;
    private Date time;

    public Post() {
        super();
    }

    public Post(long id, long user_id, String picture, String content, String location, String together, Date time) {
        super();
        this.id = id;
        this.user_id = user_id;
        this.picture = picture;
        this.content = content;
        this.location = location;
        this.together = together;
        this.time = time;
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

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getTogether() {
        return together;
    }

    public void setTogether(String together) {
        this.together = together;
    }

    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }
}
