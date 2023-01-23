package com.project.varedditbackend.repositories;

import java.util.List;

import com.project.varedditbackend.entity.User;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<User, Long> {

    List<User> findByUserName(String lastName);

    User findById(long id);
}