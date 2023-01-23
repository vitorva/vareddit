package com.project.varedditbackend.repositories;

import java.util.List;

import com.project.varedditbackend.entity.Post;
import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends CrudRepository<Post, Long> {

    Post findById(long id);
}