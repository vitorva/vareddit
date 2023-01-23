package com.project.varedditbackend.controller;

import java.util.concurrent.atomic.AtomicLong;

import com.project.varedditbackend.entity.Post;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PostController {

    private static final String template = "Hello, %s!";

    @GetMapping("/post")
    public Post post(@RequestParam(value = "content", defaultValue = "No content") String content) {
        return new Post(String.format(template, content));
    }

}
