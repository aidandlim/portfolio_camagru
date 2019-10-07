package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.SearchDao;
import com.aidandlim.camagru.dto.Post;
import com.aidandlim.camagru.dto.Search;
import com.aidandlim.camagru.dto.User;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class SearchService {

    @Autowired
    SqlSession sqlSession;

    @Autowired
    SearchDao searchDao;

    @Autowired
    PictureService pictureService;

    @Autowired
    PostService postService;

    @Transactional
    public Search select(User user) {
        try {
            searchDao = sqlSession.getMapper(SearchDao.class);
            Search dto = searchDao.select(user);
            dto.setPicture(pictureService.getPicture(dto.getPicture()));
            dto.setPosts(postService.selectAllByUser(user));
            for(int i = 0; i < dto.getPosts().size(); i++) {
                dto.getPosts().get(i).setPicture(pictureService.getPicture(dto.getPosts().get(i).getPicture()));
            }
            return (dto);
        } catch (Exception e) {
            e.printStackTrace();
            return (null);
        }
    }

}
