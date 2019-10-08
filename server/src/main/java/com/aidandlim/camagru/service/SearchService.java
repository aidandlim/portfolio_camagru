package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.SearchDao;
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
            dto.setPosts(postService.selectAllByUser(user));
            return (dto);
        } catch (Exception e) {
            e.printStackTrace();
            return (null);
        }
    }

}
