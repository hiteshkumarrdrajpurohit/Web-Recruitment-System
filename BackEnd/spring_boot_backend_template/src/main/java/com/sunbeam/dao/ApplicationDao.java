package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.Application;
import com.sunbeam.entity.User;

public interface ApplicationDao extends JpaRepository<Application, Long> {
    List<Application> findByUser(User user); // fetch all applications by a user
}
