package com.aidandlim.camagru.dto;

import java.util.ArrayList;
import java.util.Date;

public class Post extends Token {

    private long id;
    private long user_id;
    private String picture;
    private String content;
    private String location;
    private String together;
    private Date time;

    private String user_nickname;
    private String user_picture;
    private boolean user_islike;
    private int num_likes;
    private int num_comments;
    private String post_time;

    private ArrayList<Reflection> likes;
    private ArrayList<Comment> comments;

    private ArrayList<Sticker> stickers;
    private int filter;

    private int call;

    public Post() {
        super();
    }

    public Post(long id) {
        this.id = id;
    }

    public Post(long id, long user_id, String picture, String content, String location, String together, Date time, String user_nickname, String user_picture, boolean user_islike, int num_likes, int num_comments, String post_time, ArrayList<Reflection> likes, ArrayList<Comment> comments, ArrayList<Sticker> stickers, int filter, int call) {
        super();
        this.id = id;
        this.user_id = user_id;
        this.picture = picture;
        this.content = content;
        this.location = location;
        this.together = together;
        this.time = time;
        this.user_nickname = user_nickname;
        this.user_picture = user_picture;
        this.user_islike = user_islike;
        this.num_likes = num_likes;
        this.num_comments = num_comments;
        this.post_time = post_time;
        this.likes = likes;
        this.comments = comments;
        this.stickers = stickers;
        this.filter = filter;
        this.call = call;
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

    public boolean isUser_islike() {
        return user_islike;
    }

    public void setUser_islike(boolean user_islike) {
        this.user_islike = user_islike;
    }

    public int getNum_likes() {
        return num_likes;
    }

    public void setNum_likes(int num_likes) {
        this.num_likes = num_likes;
    }

    public int getNum_comments() {
        return num_comments;
    }

    public void setNum_comments(int num_comments) {
        this.num_comments = num_comments;
    }

    public String getPost_time() {
        return post_time;
    }

    public void setPost_time(String post_time) {
        this.post_time = post_time;
    }

    public ArrayList<Reflection> getLikes() {
        return likes;
    }

    public void setLikes(ArrayList<Reflection> likes) {
        this.likes = likes;
    }

    public ArrayList<Comment> getComments() {
        return comments;
    }

    public void setComments(ArrayList<Comment> comments) {
        this.comments = comments;
    }

    public ArrayList<Sticker> getStickers() {
        return stickers;
    }

    public void setStickers(ArrayList<Sticker> stickers) {
        this.stickers = stickers;
    }

    public int getFilter() {
        return filter;
    }

    public void setFilter(int filter) {
        this.filter = filter;
    }

    public int getCall() {
        return call;
    }

    public void setCall(int call) {
        this.call = call;
    }
}
