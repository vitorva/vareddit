package com.project.varedditbackend.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Role {

    private Long id;
    private String name;

    public Role(){

    }

    public void setId(Long id) {
        this.id = id;
    }

    @Id
    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
}
