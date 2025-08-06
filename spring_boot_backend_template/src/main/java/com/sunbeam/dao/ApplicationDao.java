package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sunbeam.entity.Application;

@Repository
public interface ApplicationDao extends JpaRepository<Application, Long> {
    
    List<Application> findByUserId(Long userId);
    
    List<Application> findByVacancyId(Long vacancyId);
    
    List<Application> findByUserIdAndStatus(Long userId, String status);
    
    List<Application> findByUserIdAndVacancyId(Long userId, Long vacancyId);
} 