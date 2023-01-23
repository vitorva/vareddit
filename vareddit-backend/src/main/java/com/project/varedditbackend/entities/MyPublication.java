package com.project.varedditbackend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class MyPublication {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String title;

    public MyPublication(String title) {
        this.title = title;
    }

    public MyPublication() {

    }

    @Override
    public String toString() {
        return String.format(
                "MyPublication[id=%d, title='%s']",
                id, title);
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

}
