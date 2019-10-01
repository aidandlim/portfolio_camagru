package com.aidandlim.camagru.dao;

import com.aidandlim.camagru.dto.User;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthDao {

    User signin(User user);
    void signup(User user);

}
