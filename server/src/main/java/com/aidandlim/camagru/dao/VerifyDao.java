package com.aidandlim.camagru.dao;

import com.aidandlim.camagru.dto.User;
import org.springframework.stereotype.Repository;

@Repository
public interface VerifyDao {

    User select(User user);
    void insert(User user);
    void update(User user);
    void delete(User user);

}
