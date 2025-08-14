package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.User;
import com.sunbeam.entity.Vacancy;
import com.sunbeam.entity.types.JobStatus;


public interface VacancyDao extends JpaRepository<Vacancy, Long> {
	
	List<Vacancy> findByStatus(JobStatus status);
	
}
