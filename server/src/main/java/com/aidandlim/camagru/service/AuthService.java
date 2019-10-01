package com.aidandlim.camagru.service;

import com.aidandlim.camagru.dao.AuthDao;
import com.aidandlim.camagru.dao.VerifyDao;
import com.aidandlim.camagru.dto.Token;
import com.aidandlim.camagru.dto.User;
import org.apache.commons.io.FileUtils;
import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Base64;
import java.util.UUID;

@Service
public class AuthService {

    @Autowired
    SqlSession sqlSession;

    @Autowired
    AuthDao authDao;

    @Autowired
    VerifyDao verifyDao;

    @Autowired
    TokenService tokenService;

    @Autowired
    MailService mailService;

    @Transactional
    public boolean isLogin(Token token) {
        try {
            return (token.getToken().equals("") ? false : tokenService.checkToken(token));
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public Token signin(User user) {
        try {
            authDao = sqlSession.getMapper(AuthDao.class);
            User result = authDao.signin(user);
            if(result.getAuthorized() == 1) {
                return new Token(tokenService.createToken(result).getToken(), 1);
            } else {
                return new Token(0);
            }
        } catch (Exception e) {
            e.printStackTrace();
            return new Token("");
        }
    }

    @Transactional
    public boolean signup(User user) {
        try {
            authDao = sqlSession.getMapper(AuthDao.class);
            verifyDao = sqlSession.getMapper(VerifyDao.class);

            authDao.signup(user);
            user.setUuid(UUID.randomUUID().toString().replace("-", ""));
            mailService.sendVerifyMail(user);
            verifyDao.insert(user);

            return true;
        } catch(Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public String verify(User user) {
        try {
            verifyDao = sqlSession.getMapper(VerifyDao.class);

            if(verifyDao.select(user).getUuid().equals(user.getUuid())) {
                verifyDao.update(user);
                verifyDao.delete(user);
            } else {
                return "Fail";
            }
            return "Success";
        } catch(Exception e) {
            e.printStackTrace();
            return "Fail";
        }
    }

    @Transactional
    public boolean verifyAgain(User user) {
        try {
            verifyDao = sqlSession.getMapper(VerifyDao.class);
            verifyDao.delete(user);
            user.setUuid(UUID.randomUUID().toString().replace("-", ""));
            mailService.sendVerifyMail(user);
            verifyDao.insert(user);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public boolean forgot(User user) {
        try {
            authDao = sqlSession.getMapper(AuthDao.class);
            user.setUuid(UUID.randomUUID().toString().replace("-", ""));
            user.setChange(user.getUuid());
            authDao.updatePassword(user);
            mailService.sendForgotMail(user);
            return true;
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
    }

    @Transactional
    public User select(Token token) {
        try {
            authDao = sqlSession.getMapper(AuthDao.class);
            User result = authDao.select(tokenService.getIdFromToken(token));
            result.setPicture(getPicture(result.getPicture()));
            return (result);
        } catch (Exception e) {
            e.printStackTrace();
            return (null);
        }
    }

    @Transactional
    public String getPicture(String uuid) {
        try {
            byte[] fileContent = FileUtils.readFileToByteArray(new File("/Users/aidan/Workspace/portfolio_camagru/static/" + uuid));
            String encodedString = Base64.getEncoder().encodeToString(fileContent);
            return (encodedString);
        } catch (Exception e) {
            e.printStackTrace();
            return (null);
        }
    }

    @Transactional
    public boolean update(User user) {
        if(!tokenService.checkToken(new Token(user.getToken())))
            return false;
        try {
            authDao = sqlSession.getMapper(AuthDao.class);
            authDao.update(user);
            User temp = authDao.select(tokenService.getIdFromToken(new Token(user.getToken())));
            if(!temp.getEmail().equals(user.getEmail())) {
                verifyDao = sqlSession.getMapper(VerifyDao.class);
                user.setUuid(UUID.randomUUID().toString().replace("-", ""));
                mailService.sendVerifyMail(user);
                verifyDao.update(temp);
                verifyDao.insert(user);
            }
            return (true);
        } catch (Exception e) {
            e.printStackTrace();
            return (false);
        }
    }

    @Transactional
    public boolean updatePicture(String token, MultipartFile file) {
        try {
            authDao = sqlSession.getMapper(AuthDao.class);
            String name = UUID.randomUUID().toString();
            byte[] bytes = file.getBytes();
            Path path = Paths.get("/Users/aidan/Workspace/portfolio_camagru/static/" + name);
            Files.write(path, bytes);
            authDao.updatePicture(name, tokenService.getIdFromToken(new Token(token)));
            return (true);
        } catch (Exception e) {
            e.printStackTrace();
            return (false);
        }
    }

    @Transactional
    public boolean updatePassword(User user) {
        if(!tokenService.checkToken(new Token(user.getToken())))
            return false;
        try {
            authDao = sqlSession.getMapper(AuthDao.class);
            if(authDao.signin(user) == null)
                return (false);
            authDao.updatePassword(user);
            return (true);
        } catch (Exception e) {
            e.printStackTrace();
            return (false);
        }
    }

    @Transactional
    public boolean updatePrivate(User user) {
        if(!tokenService.checkToken(new Token(user.getToken())))
            return false;
        try {
            authDao = sqlSession.getMapper(AuthDao.class);
            authDao.updatePrivate(user);
            return (true);
        } catch (Exception e) {
            e.printStackTrace();
            return (false);
        }
    }

    @Transactional
    public boolean updateNotificate(User user) {
        if(!tokenService.checkToken(new Token(user.getToken())))
            return false;
        try {
            authDao = sqlSession.getMapper(AuthDao.class);
            authDao.updateNotificate(user);
            return (true);
        } catch (Exception e) {
            e.printStackTrace();
            return (false);
        }
    }

    @Transactional
    public boolean delete(User user) {
        try {
            authDao = sqlSession.getMapper(AuthDao.class);
            authDao.delete(user);
            return (true);
        } catch (Exception e) {
            e.printStackTrace();
            return (false);
        }
    }

}
