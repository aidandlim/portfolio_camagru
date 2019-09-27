package com.aidandlim.camagru.dao;

import com.aidandlim.camagru.dto.User;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthDao {

    public User signin(User user);
    public void signup(User user);

    public User selectById(long id);

}
