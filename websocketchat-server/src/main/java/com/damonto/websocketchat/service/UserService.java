package com.damonto.websocketchat.service;

import com.damonto.websocketchat.model.User;

import java.util.List;

public interface UserService {

    User save(User user);
    List<User> findAll();
    User find(long id);
    void delete(long id);
}
