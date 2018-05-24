package com.damonto.websocketchat.service;

import com.damonto.websocketchat.model.Topic;

import java.util.List;

public interface TopicService {

    Topic save(Topic topic);
    List<Topic> findAll();
    Topic find(long id);
    Topic delete(long id);

}
