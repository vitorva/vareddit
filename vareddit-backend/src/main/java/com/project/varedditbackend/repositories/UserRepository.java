package com.project.varedditbackend.repositories;

import com.project.varedditbackend.entities.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    User findById(long id);
}