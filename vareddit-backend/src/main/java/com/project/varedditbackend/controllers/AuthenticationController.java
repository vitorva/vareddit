package com.project.varedditbackend.controllers;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.web.bind.annotation.*;


@RestController
class AuthenticationController {
    @Value("${com.project.varedditbackend.jwtToken.accessToken}")
    private String accessTokenName;

    @Value("${com.project.varedditbackend.jwtToken.duration}")
    private String duration;

    //@Autowired
    //private JwtUtil jwtTokenUtil;
}
