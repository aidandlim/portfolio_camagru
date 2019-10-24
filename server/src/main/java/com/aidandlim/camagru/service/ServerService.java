package com.aidandlim.camagru.service;

import com.aidandlim.camagru.config.Const;
import com.aidandlim.camagru.dao.PostDao;
import com.aidandlim.camagru.dto.Post;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ServerService {

    @Autowired
    SqlSession sqlSession;

    @Autowired
    PostDao postDao;

    public String server() {
        try {
            String result = "";

            result += "<html>";

            result += "<header>";
            result += "<title>#Camagru</title>";
            result += "<meta name=\"description\" content=\"Camagru Server Status\">";
            result += "<link rel=\"shortcut icon\" href=\"http://icons.iconarchive.com/icons/designbolts/free-multimedia/64/Dslr-Camera-icon.png\" type=\"image/png\" />";
            result += "<link href=\"https://fonts.googleapis.com/css?family=Astloch|Quicksand&display=swap\" rel=\"stylesheet\">";
            result += "<link href=\"http://icons.iconarchive.com/icons/designbolts/free-multimedia/512/Dslr-Camera-icon.png\" rel=\"shortcut icon\">";
            result += "</header>";

            result += "<body  style=\"width: 100%; height: 100vh; background-color: #303030; margin: 0; padding: 0; overflow: hidden;\">";

            result += "<div style=\"width: 100%; height: 70px; position: relative; float: left; background-color: #101010; border-bottom: solid #404040 1px; color: #808080; font-size: 30px; font-family: 'Astloch', cursive; line-height: 70px; text-indent: 30px\">#Camagru</div>";

            result += "<div style=\"width: 100%; height: calc(100vh - 142px); position: relative; float: left; color: #AAAAAA; font-size: 15px; font-weight: 900; font-family: 'Quicksand', sans-serif; text-align: center; line-height: calc(100vh - 142px);\">Camagru Application Server is running on " + Const.URL_SERVER + "</div>";

            result += "<div style=\"width: 100%; height: 70px; position: relative; float: left; background-color: #101010; border-top: solid #404040 1px;\">";

            result += "<button style=\"width: 300px; height: 40px; margin: 14px calc(50% - 150px); color: #EEEEEE; font-size: 13px; font-weight: 900; font-family: 'Quicksand', sans-serif; background-color: #404040; border: solid 1px #606060; border-radius: 10px; cursor: pointer\" onclick=\"location.href='" + Const.URL_APP + "'\">Go to Camagru Application</button>";

            result += "</div>";

            result += "</body>";
            result += "</html>";

            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String verify() {
        try {
            String result = "";

            result += "<html>";

            result += "<header>";
            result += "<title>#Camagru</title>";
            result += "<meta name=\"description\" content=\"#Camagru\">";
            result += "<link rel=\"shortcut icon\" href=\"http://icons.iconarchive.com/icons/designbolts/free-multimedia/64/Dslr-Camera-icon.png\" type=\"image/png\" />";
            result += "<link href=\"https://fonts.googleapis.com/css?family=Astloch|Quicksand&display=swap\" rel=\"stylesheet\">";
            result += "<link href=\"http://icons.iconarchive.com/icons/designbolts/free-multimedia/512/Dslr-Camera-icon.png\" rel=\"shortcut icon\">";
            result += "<script>";
            result += "setTimeout(function(){ location.href=\"" + Const.URL_APP + "\"; }, 5000);";
            result += "</script>";
            result += "</header>";

            result += "<body  style=\"width: 100%; height: 100vh; background-color: #303030; margin: 0; padding: 0; overflow: hidden;\">";

            result += "<div style=\"width: 100%; height: 70px; position: relative; float: left; background-color: #101010; border-bottom: solid #404040 1px; color: #808080; font-size: 30px; font-family: 'Astloch', cursive; line-height: 70px; text-indent: 30px\">#Camagru</div>";

            result += "<div style=\"width: 100%; height: calc(100vh - 142px); position: relative; float: left; color: #AAAAAA; font-size: 15px; font-weight: 900; font-family: 'Quicksand', sans-serif; text-align: center; line-height: calc(100vh - 142px);\">This email has been verified! Redirect to application soon...!</div>";

            result += "<div style=\"width: 100%; height: 70px; position: relative; float: left; background-color: #101010; border-top: solid #404040 1px;\">";

            result += "<button style=\"width: 300px; height: 40px; margin: 14px calc(50% - 150px); color: #EEEEEE; font-size: 13px; font-weight: 900; font-family: 'Quicksand', sans-serif; background-color: #404040; border: solid 1px #606060; border-radius: 10px; cursor: pointer\" onclick=\"location.href='" + Const.URL_APP + "'\">Go to Camagru Application now</button>";

            result += "</div>";

            result += "</body>";
            result += "</html>";

            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String error() {
        try {
            String result = "";

            result += "<html>";

            result += "<header>";
            result += "<title>#Camagru</title>";
            result += "<meta name=\"description\" content=\"Camagru Server Error Handler\">";
            result += "<link rel=\"shortcut icon\" href=\"http://icons.iconarchive.com/icons/designbolts/free-multimedia/64/Dslr-Camera-icon.png\" type=\"image/png\" />";
            result += "<link href=\"https://fonts.googleapis.com/css?family=Astloch|Quicksand&display=swap\" rel=\"stylesheet\">";
            result += "<link href=\"http://icons.iconarchive.com/icons/designbolts/free-multimedia/512/Dslr-Camera-icon.png\" rel=\"shortcut icon\">";
            result += "</header>";

            result += "<body  style=\"width: 100%; height: 100vh; background-color: #303030; margin: 0; padding: 0; overflow: hidden;\">";

            result += "<div style=\"width: 100%; height: 70px; position: relative; float: left; background-color: #101010; border-bottom: solid #404040 1px; color: #808080; font-size: 30px; font-family: 'Astloch', cursive; line-height: 70px; text-indent: 30px\">#Camagru</div>";

            result += "<div style=\"width: 100%; height: calc(100vh - 142px); position: relative; float: left; color: #AAAAAA; font-size: 15px; font-weight: 900; font-family: 'Quicksand', sans-serif; text-align: center; line-height: calc(100vh - 142px);\">Something went wrong!</div>";

            result += "<div style=\"width: 100%; height: 70px; position: relative; float: left; background-color: #101010; border-top: solid #404040 1px;\">";

            result += "<button style=\"width: 300px; height: 40px; margin: 14px calc(50% - 150px); color: #EEEEEE; font-size: 13px; font-weight: 900; font-family: 'Quicksand', sans-serif; background-color: #404040; border: solid 1px #606060; border-radius: 10px; cursor: pointer\" onclick=\"location.href='" + Const.URL_APP + "'\">Go to Camagru Application</button>";

            result += "</div>";

            result += "</body>";
            result += "</html>";

            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

    public String share(String sid) {
        try {
            postDao = sqlSession.getMapper(PostDao.class);
            Post dto = postDao.select(new Post(Long.parseLong(sid)));
            String result = "";

            result += "<html>";

            result += "<header>";

            if(dto == null) {
                result += "<title>Forbidden</title>";
            } else {
                result += "<title>" + dto.getUser_nickname() + "'s post on Camagru</title>";
            }

            result += "<meta name=\"description\" content=\"Check out the post on Camagru app\">";
            result += "<link rel=\"shortcut icon\" href=\"http://icons.iconarchive.com/icons/designbolts/free-multimedia/64/Dslr-Camera-icon.png\" type=\"image/png\" />";
            result += "<link href=\"https://fonts.googleapis.com/css?family=Astloch|Quicksand&display=swap\" rel=\"stylesheet\">";
            result += "<link href=\"http://icons.iconarchive.com/icons/designbolts/free-multimedia/512/Dslr-Camera-icon.png\" rel=\"shortcut icon\">";
            result += "</header>";

            result += "<body  style=\"width: 100%; height: 100vh; background-color: #303030; margin: 0; padding: 0; overflow: hidden;\">";

            result += "<div style=\"width: 50%; height: 70px; position: relative; float: left; background-color: #101010; border-bottom: solid #404040 1px; color: #808080; font-size: 30px; font-family: 'Astloch', cursive; line-height: 70px; text-indent: 30px\">#Camagru</div>";

            if(dto == null) {
                result += "<div style=\"width: calc(50% - 30px); height: 70px; padding-right: 30px; position: relative; float: left; background-color: #101010; border-bottom: solid #404040 1px; color: #808080; font-size: 15px; font-family: 'Quicksand', sans-serif; text-align: right; line-height: 70px;\"></div>";
            } else {
                result += "<div style=\"width: calc(50% - 30px); height: 70px; padding-right: 30px; position: relative; float: left; background-color: #101010; border-bottom: solid #404040 1px; color: #808080; font-size: 15px; font-family: 'Quicksand', sans-serif; text-align: right; line-height: 70px;\">by " + dto.getUser_nickname() + "</div>";
            }

            if(dto == null) {
                result += "<div style=\"width: 100%; height: calc(100vh - 142px); position: relative; float: left; color: #AAAAAA; font-size: 15px; font-weight: 900; font-family: 'Quicksand', sans-serif; text-align: center; line-height: calc(100vh - 142px);\">This post is not valid anymore! Check out another post :)</div>";
            } else {
                result += "<div style=\"width: 100%; height: calc(100vh - 142px); position: relative; float: left; background-size: contain; background-repeat: no-repeat; background-position: center; background-image: url(\'" + Const.URL_SERVER + "api/picture?p=" + dto.getPicture() + "\')\"></div>";
            }

            result += "<div style=\"width: 100%; height: 70px; position: relative; float: left; background-color: #101010; border-top: solid #404040 1px;\">";

            if(dto == null) {
                result += "<button style=\"width: 300px; height: 40px; margin: 14px calc(50% - 150px); color: #EEEEEE; font-size: 13px; font-weight: 900; font-family: 'Quicksand', sans-serif; background-color: #404040; border: solid 1px #606060; border-radius: 10px; cursor: pointer\" onclick=\"location.href='" + Const.URL_APP + "'\">Check another posts on Camagru App</button>";
            } else {
                result += "<button style=\"width: 300px; height: 40px; margin: 14px calc(50% - 150px); color: #EEEEEE; font-size: 13px; font-weight: 900; font-family: 'Quicksand', sans-serif; background-color: #404040; border: solid 1px #606060; border-radius: 10px; cursor: pointer; outline: none;\" onclick=\"location.href='" + Const.URL_APP + "'\">Check out on Camagru App</button>";
            }

            result += "</div>";

            result += "</body>";
            result += "</html>";

            return result;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }
    }

}
