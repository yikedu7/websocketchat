package com.damonto.websocketchat.model;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.HashSet;

@Entity
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private long id;

    @Column
    private String username;

    @Column
    @JsonIgnore
    private String password;

    @Column
    private HashSet<String> topics;

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public HashSet<String> getTopics() {
        return topics;
    }

    public void setTopics(HashSet topics) {
        this.topics = topics;
    }

    public void addTopic(String topic) {
        this.topics.add(topic);
    }

    public void deleteTopic(String topic) {
        this.topics.remove(topic);
    }
}
