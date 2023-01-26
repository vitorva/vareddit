package com.project.varedditbackend.entities;

import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.Collection;


@Entity
public class AppUser {

    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private Long id;

    private String userName;
    private String password;

    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();


    //private Collections<Role> roles = new ArrayList<>();

    // Required for creating JSON parsing
    public AppUser() {
    }

    public AppUser(String userName, String password) {
        this.userName = userName;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public String getUserName() {
        return userName;
    }

    public String getPassword() {
        return password;
    }
}
