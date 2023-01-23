package com.project.varedditbackend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Post {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String title;

    public Post(String title) {
        this.title = title;
    }

    public Post() {

    }

    @Override
    public String toString() {
        return String.format(
                "Post[id=%d, title='%s']",
                id, title);
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

}
