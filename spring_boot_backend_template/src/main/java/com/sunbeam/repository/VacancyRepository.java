package com.sunbeam.repository;

import java.util.List;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.sunbeam.entity.Vacancy;

public interface VacancyRepository extends JpaRepository<Vacancy, Long> {
    List<Vacancy> findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
            String title, String description, Pageable pageable);

    @Query("SELECT v FROM Vacancy v WHERE " +
           "v.status = 'ACTIVE' AND " +
           "(:searchTerm IS NULL OR LOWER(v.title) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR LOWER(v.description) LIKE LOWER(CONCAT('%', :searchTerm, '%'))) AND " +
           "(:location IS NULL OR LOWER(v.location) = LOWER(:location)) AND " +
           "(:jobType IS NULL OR LOWER(v.employementType) = LOWER(:jobType))")
    List<Vacancy> findActiveVacancies(
            @Param("searchTerm") String searchTerm,
            @Param("location") String location,
            @Param("jobType") String jobType,
            Pageable pageable);
}
