package com.project.varedditbackend.repositories;

import com.project.varedditbackend.entity.MyPublication;
import org.springframework.data.repository.CrudRepository;

public interface MyPublicationRepository extends CrudRepository<MyPublication, Long> {

    MyPublication findById(long id);
}