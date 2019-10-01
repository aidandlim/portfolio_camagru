package com.aidandlim.camagru.dao;

import com.aidandlim.camagru.dto.Post;
import com.aidandlim.camagru.dto.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface PostDao {

    ArrayList<Post> selectAll();
    ArrayList<Post> selectAllByUser(User user);
    Post select(Post post);
    void insert(Post post);
    void update(Post post);
    void delete(Post post);

}
