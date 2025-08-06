package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.sunbeam.entity.User;
import com.sunbeam.entity.Vacancy;
import com.sunbeam.entity.types.JobStatus;

@Repository
public interface VacancyDao extends JpaRepository<Vacancy, Long> {
	
	List<Vacancy> findByStatus(JobStatus status);
	
	List<Vacancy> findByTitleContainingIgnoreCaseOrJobDescriptionContainingIgnoreCase(String title, String jobDescription);
}
