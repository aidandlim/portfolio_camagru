package com.aidandlim.camagru.dto;

import java.util.ArrayList;

public class Search {

    private long id;
    private String picture;
    private String nickname;
    private String bio;
    private int isPrivate;
    private int num_posts;
    private int num_likes;
    private int num_comments;
    private ArrayList<Post> posts;
    private String keyword;

    public Search() {
    }

    public Search(long id, String picture, String nickname, String bio, int isPrivate, int num_posts, int num_likes, int num_comments, ArrayList<Post> posts, String keyword) {
        this.id = id;
        this.picture = picture;
        this.nickname = nickname;
        this.bio = bio;
        this.isPrivate = isPrivate;
        this.num_posts = num_posts;
        this.num_likes = num_likes;
        this.num_comments = num_comments;
        this.posts = posts;
        this.keyword = keyword;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPicture() {
        return picture;
    }

    public void setPicture(String picture) {
        this.picture = picture;
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

    public int getIsPrivate() {
        return isPrivate;
    }

    public void setIsPrivate(int isPrivate) {
        this.isPrivate = isPrivate;
    }

    public int getNum_posts() {
        return num_posts;
    }

    public void setNum_posts(int num_posts) {
        this.num_posts = num_posts;
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

    public ArrayList<Post> getPosts() {
        return posts;
    }

    public void setPosts(ArrayList<Post> posts) {
        this.posts = posts;
    }

    public String getKeyword() {
        return keyword;
    }

    public void setKeyword(String keyword) {
        this.keyword = keyword;
    }
}
