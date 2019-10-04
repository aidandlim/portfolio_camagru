package com.aidandlim.camagru.dao;

import com.aidandlim.camagru.dto.Notification;
import org.springframework.stereotype.Repository;

import java.util.ArrayList;

@Repository
public interface NotificationDao {

    ArrayList<Notification> selectAll(long user_id);

}
