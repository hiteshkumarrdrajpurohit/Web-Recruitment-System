package com.sunbeam.dao;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sunbeam.entity.User;
import com.sunbeam.entity.Vacancy;
import com.sunbeam.entity.types.JobStatus;


public interface VacancyDao extends JpaRepository<Vacancy, Long> {
	
	List<Vacancy> findByStatus(JobStatus status);
	 @Query("SELECT v FROM Vacancy v WHERE " +
	           "(LOWER(v.title) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
	           "OR LOWER(v.description) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
	           "OR LOWER(v.department) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
	           "OR LOWER(v.location) LIKE LOWER(CONCAT('%', :keyword, '%'))) " +
	           "AND v.status = com.sunbeam.entity.types.JobStatus.ACTIVE")
	    List<Vacancy> searchByKeyword(@Param("keyword") String keyword);
}
