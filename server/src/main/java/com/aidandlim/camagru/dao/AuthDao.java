package com.aidandlim.camagru.dao;

import com.aidandlim.camagru.dto.User;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthDao {

    User signin(User user);
    void signup(User user);
    User select(long id);
    void update(User user);
    void updatePassword(User user);
    void updatePrivate(User user);
    void updateNotificate(User user);
    void delete(User user);

}
