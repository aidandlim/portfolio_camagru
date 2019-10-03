package com.aidandlim.camagru.dao;

import com.aidandlim.camagru.dto.Comment;
import com.aidandlim.camagru.dto.Post;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface CommentDao {

    ArrayList<Comment> selectAllByPost(Post post);
    void insert(Comment comment);
    void delete(Comment comment);

}
