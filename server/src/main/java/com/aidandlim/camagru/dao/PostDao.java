package com.aidandlim.camagru.dao;

import com.aidandlim.camagru.dto.Post;
import com.aidandlim.camagru.dto.User;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface PostDao {

    ArrayList<Post> selectAll(long user_id, int call);
    ArrayList<Post> selectAllByUser(User user);
    Post select(Post post);
    String selectUserEmailByPostId(long post_id, long user_id);
    void insert(Post post);
    void delete(Post post);

}
