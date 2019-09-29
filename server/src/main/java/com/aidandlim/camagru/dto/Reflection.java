package com.aidandlim.camagru.dto;

import java.util.Date;

public class Reflection extends Token {

    private long id;
    private long user_id;
    private long post_id;
    private Date time;

    public Reflection() {
        super();
    }

    public Reflection(long id, long user_id, long post_id, Date time) {
        super();
        this.id = id;
        this.user_id = user_id;
        this.post_id = post_id;
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
}
