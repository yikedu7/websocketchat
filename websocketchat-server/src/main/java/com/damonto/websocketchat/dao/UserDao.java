package com.damonto.websocketchat.dao;

import com.damonto.websocketchat.model.User;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao extends CrudRepository<User, Long>{

    User findByUsername(String username);
}
