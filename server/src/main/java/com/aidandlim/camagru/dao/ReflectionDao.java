package com.aidandlim.camagru.dao;

import com.aidandlim.camagru.dto.Post;
import com.aidandlim.camagru.dto.Reflection;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface ReflectionDao {

    ArrayList<Reflection> selectAllByPost(Post post);
    Reflection select(Reflection reflection);
    void insert(Reflection reflection);
    void delete(Reflection reflection);

}
