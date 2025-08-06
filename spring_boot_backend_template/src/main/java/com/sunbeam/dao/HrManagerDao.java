package com.sunbeam.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sunbeam.entity.HrManager;

@Repository
public interface HrManagerDao extends JpaRepository<HrManager, Long> {
    
    HrManager findByUserId(Long userId);
    
    boolean existsByUserId(Long userId);
} 