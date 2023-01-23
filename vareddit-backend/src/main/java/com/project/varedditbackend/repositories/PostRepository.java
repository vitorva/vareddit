package com.project.varedditbackend.repositories;

import com.project.varedditbackend.entities.Post;
import org.springframework.data.repository.CrudRepository;

public interface PostRepository extends CrudRepository<Post, Long> {

    Post findById(long id);

}