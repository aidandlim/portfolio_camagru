package com.aidandlim.camagru.dto;

public class Filter extends Token {

    private String search;
    private int num_call;
    private int num_post;

    public Filter() {
        super();
    }

    public Filter(String search, int num_call, int num_post) {
        this.search = search;
        this.num_call = num_call;
        this.num_post = num_post;
    }

    public String getSearch() {
        return search;
    }

    public void setSearch(String search) {
        this.search = search;
    }

    public int getNum_call() {
        return num_call;
    }

    public void setNum_call(int num_call) {
        this.num_call = num_call;
    }

    public int getNum_post() {
        return num_post;
    }

    public void setNum_post(int num_post) {
        this.num_post = num_post;
    }
}
