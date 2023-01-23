package com.project.varedditbackend.controllers;

import com.project.varedditbackend.entities.Post;
import com.project.varedditbackend.repositories.PostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/posts")
public class PostController {

    @Autowired
    PostRepository postRepository;

    @GetMapping("")
    public List<Post> posts() {
        List<Post> listsPost = (List<Post>) postRepository.findAll();
        return listsPost;
    }

    @GetMapping("/{id}")
    public Post get(@PathVariable long id) throws Exception {
        Post post;
        post = postRepository.findById(id);
        return post;
    }

    @PostMapping("/add")
    public Post add(@RequestParam(value = "content", defaultValue = "No content") String content) { // ?content=xxx
        Post newPost = new Post(content);
        postRepository.save(newPost);
        return newPost;
    }

    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) throws Exception {
        postRepository.deleteById(id);
        // indicates safely delete
    }

    @PostMapping("/update")
    public Post update(@RequestParam(name = "id") long id,
                       @RequestParam(name = "title") String title) throws Exception {

        Post updatedPost = postRepository.findById(id);

        updatedPost.setTitle(title);

        postRepository.save(updatedPost);

        return updatedPost;

    }
}
