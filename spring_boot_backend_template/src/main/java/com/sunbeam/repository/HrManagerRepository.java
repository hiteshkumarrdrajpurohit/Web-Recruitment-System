package com.sunbeam.repository;

import com.sunbeam.entity.HrManager;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HrManagerRepository extends JpaRepository<HrManager, Long> {
}