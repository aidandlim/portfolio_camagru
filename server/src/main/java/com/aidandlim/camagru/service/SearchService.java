package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.SearchDao;
import com.aidandlim.camagru.dto.Post;
import com.aidandlim.camagru.dto.Search;
import com.aidandlim.camagru.dto.User;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;

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

    @Transactional
    public ArrayList<User> selectUserByKeyword(Search search) {
        try {
            searchDao = sqlSession.getMapper(SearchDao.class);
            return (searchDao.selectUserByKeyword(search));
        } catch (Exception e) {
            e.printStackTrace();
            return (null);
        }
    }

    @Transactional
    public ArrayList<Post> selectPostByKeyword(Search search) {
        try {
            searchDao = sqlSession.getMapper(SearchDao.class);
            return (searchDao.selectPostByKeyword(search));
        } catch (Exception e) {
            e.printStackTrace();
            return (null);
        }
    }

}
