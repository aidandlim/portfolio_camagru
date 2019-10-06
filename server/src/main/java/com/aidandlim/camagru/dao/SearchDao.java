package com.aidandlim.camagru.dao;

import com.aidandlim.camagru.dto.Search;
import com.aidandlim.camagru.dto.User;
import org.springframework.stereotype.Repository;

@Repository
public interface SearchDao {

    Search select(User user);

}
