package com.project.varedditbackend.controllers;

import com.project.varedditbackend.entities.AppUser;
import com.project.varedditbackend.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class AppUserController {

    @Autowired
    UserRepository userRepository;

    //me, register, login, logout

    @PostMapping("/register")
    public void register(@RequestBody AppUser user){ // body : { "userName" : "toto","password" : "1234" }
        // todo : verification
        userRepository.save(user);
    }

    @GetMapping("")
    public List<AppUser> users() {
        List<AppUser> listsUser = (List<AppUser>) userRepository.findAll();
        return listsUser;
    }

    @PostMapping("/login")
    public void login(@RequestBody AppUser user){
        // todo : Créer le token
        userRepository.save(user);
    }

    @PostMapping("/logout")
    public void logout(){
        // TODO : supprimer le token
    }



}
