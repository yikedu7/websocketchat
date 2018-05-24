package com.damonto.websocketchat.model;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.ArrayList;
import java.util.List;

@Entity(name = "Topic")
@Table(name = "topic")
public class Topic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @Column(unique = true)
    @Size(max = 20)
    private String name;

    @ManyToMany(mappedBy = "topics")
    private List<User> subscribers = new ArrayList<>();

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public List<User> getSubscribers() {
        return subscribers;
    }

    public void setSubscribers(List<User> subscribers) {
        this.subscribers = subscribers;
    }

    public void addSubscribers(User user) {
        this.subscribers.add(user);
        user.getTopics().add(this);
    }

    public void removeSubscribers(User user) {
        this.subscribers.remove(user);
        user.getTopics().remove(this);
    }

    @Override
    public String toString() {
        return "Topic:" + this.name;
    }
}
