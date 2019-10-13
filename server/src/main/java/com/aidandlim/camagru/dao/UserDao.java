package com.aidandlim.camagru.dao;

import com.aidandlim.camagru.dto.User;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao {

    User select(long id);
    User selectByEmail(User user);
    void update(User user);
    void updatePassword(User user);
    void updatePrivate(User user);
    void updateNotificate(User user);
    void updatePicture(String fileName, long id);
    void delete(User user);

}
