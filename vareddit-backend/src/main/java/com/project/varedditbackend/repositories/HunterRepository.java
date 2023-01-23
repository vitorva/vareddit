package com.project.varedditbackend.repositories;

import java.util.List;

import com.project.varedditbackend.entities.Hunter;
import org.springframework.data.repository.CrudRepository;

public interface HunterRepository extends CrudRepository<Hunter, Long> {

    List<Hunter> findByLastName(String lastName);

    Hunter findById(long id);
}