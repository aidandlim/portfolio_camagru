package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.PostDao;
import com.aidandlim.camagru.dto.Post;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ShareService {

    @Autowired
    SqlSession sqlSession;

    @Autowired
    PostDao postDao;

    @Transactional
    public String share(String id) {
        try {
            postDao = sqlSession.getMapper(PostDao.class);
            Post dto = postDao.select(new Post(Long.parseLong(id)));
            String result = "<html>";
            result += "<header>";
            result += "<title>" + dto.getUser_nickname() + "'s post on Camagru</title>";
            result += "<meta name=\"description\" content=\"Check out the post on Camagru app\"";
            result += "<link href=\"https://fonts.googleapis.com/css?family=Astloch|Quicksand&display=swap\" rel=\"stylesheet\">";
            result += "</header>";
            result += "<body  style=\"width: 100%; height: 100vh; background-color: #303030; margin: 0; padding: 0; overflow: hidden;\">";
            result += "<div style=\"width: 50%; height: 70px; position: relative; float: left; background-color: #101010; border-bottom: solid #404040 1px; color: #808080; font-size: 30px; font-family: 'Astloch', cursive; line-height: 70px; text-indent: 30px\">Camagru</div><div style=\"width: calc(50% - 30px); height: 70px; padding-right: 30px; position: relative; float: left; background-color: #101010; border-bottom: solid #404040 1px; color: #808080; font-size: 20px; font-family: 'Quicksand', sans-serif; text-align: right; line-height: 70px;\">by " + dto.getUser_nickname() + "</div>";
            result += "<div style=\"width: 100%; height: calc(100vh - 142px); position: relative; float: left; background-size: contain; background-repeat: no-repeat; background-position: center; background-image: url(\'https://10.10.136.78:8443/api/picture?p=" + dto.getPicture() + "\')\"></div>";
            result += "<div style=\"width: 100%; height: 70px; position: relative; float: left; background-color: #101010; border-top: solid #404040 1px;\"><button style=\"width: 300px; height: 40px; margin: 14px calc(50% - 150px); color: #DDDDDD; font-size: 15px; font-weight: 900; background-color: #808080; border: solid 1px #404040; border-radius: 5px; cursor: pointer\" onclick=\"location.href='https://10.10.136.78:3000'\">Check out on Camagru App</button></div>";
            result += "</body>";
            result += "</html>";
            return result;
        } catch (Exception e) {
            return null;
        }
    }

}
