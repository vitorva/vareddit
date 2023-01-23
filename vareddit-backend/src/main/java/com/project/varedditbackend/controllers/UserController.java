package com.project.varedditbackend.controllers;

import com.project.varedditbackend.entities.User;
import com.project.varedditbackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    UserRepository userRepository;

    //me, register, login, logout

    @PostMapping("/register")
    public void register(@RequestBody User user){ // body : { "userName" : "toto","password" : "1234" }
        // todo : verification
        userRepository.save(user);
    }

    @GetMapping("")
    public List<User> users() {
        List<User> listsUser = (List<User>) userRepository.findAll();
        return listsUser;
    }

}
