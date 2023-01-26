package com.project.varedditbackend.repositories;

import com.project.varedditbackend.entities.AppUser;
import org.springframework.data.repository.CrudRepository;

public interface UserRepository extends CrudRepository<AppUser, Long> {

    AppUser findById(long id);

    //void storeUser(User user);
}