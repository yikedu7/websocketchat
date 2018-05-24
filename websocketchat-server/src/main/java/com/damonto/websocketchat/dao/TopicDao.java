package com.damonto.websocketchat.dao;

import com.damonto.websocketchat.model.Topic;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface TopicDao extends CrudRepository<Topic, Long> {

    Topic findByName(String name);


}
