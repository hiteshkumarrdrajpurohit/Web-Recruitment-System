package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.VacancyDTO;
import com.sunbeam.entity.types.JobStatus;

/**
 * Service interface for Vacancy operations
 * Handles vacancy-related business logic
 */
public interface VacancyService {
    
    /**
     * Get all active vacancies (for job seekers)
     * @return List of active vacancies
     */
    List<VacancyDTO> getAllActiveVacancies();
    
    /**
     * Get all vacancies (for HR)
     * @return List of all vacancies
     */
    List<VacancyDTO> getAllVacancies();
    
    /**
     * Get vacancy by ID
     * @param id - Vacancy ID
     * @return Vacancy details
     */
    VacancyDTO getVacancyById(Long id);
    
    /**
     * Create new vacancy
     * @param vacancyDTO - Vacancy details
     * @return Created vacancy
     */
    VacancyDTO createVacancy(VacancyDTO vacancyDTO);
    
    /**
     * Create new vacancy with HR email
     * @param vacancyDTO - Vacancy details
     * @param hrEmail - HR manager's email
     * @return Created vacancy
     */
    VacancyDTO createVacancy(VacancyDTO vacancyDTO, String hrEmail);
    
    /**
     * Update vacancy
     * @param id - Vacancy ID
     * @param vacancyDTO - Updated vacancy details
     * @return Updated vacancy
     */
    VacancyDTO updateVacancy(Long id, VacancyDTO vacancyDTO);
    
    /**
     * Delete vacancy
     * @param id - Vacancy ID
     * @return Success/failure response
     */
    ApiResponse deleteVacancy(Long id);
    
    /**
     * Get vacancies by status
     * @param status - Job status
     * @return List of vacancies with the given status
     */
    List<VacancyDTO> getVacanciesByStatus(JobStatus status);
    
    /**
     * Search vacancies by criteria
     * @param title - Job title (optional)
     * @param department - Department (optional)
     * @param location - Location (optional)
     * @return List of matching vacancies
     */
    List<VacancyDTO> searchVacancies(String title, String department, String location);
}
