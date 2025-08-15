package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ApplicationDTO;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.entity.types.ApplicationStatus;

/**
 * Service interface for Application operations
 * Handles application-related business logic
 */
public interface ApplicationService {
    
    /**
     * Apply for a job vacancy
     * @param userId - ID of the user applying
     * @param vacancyId - ID of the vacancy
     * @param coverLetter - Optional cover letter
     * @return ApplicationDTO - Created application details
     */
    ApplicationDTO applyForJob(Long userId, Long vacancyId, String coverLetter);
    
    /**
     * Apply for a job vacancy using user email
     * @param userEmail - Email of the user applying
     * @param vacancyId - ID of the vacancy
     * @param coverLetter - Optional cover letter
     * @return ApplicationDTO - Created application details
     */
    ApplicationDTO applyForJobByEmail(String userEmail, Long vacancyId, String coverLetter);
    
    /**
     * Get all applications for a user
     * @param userId - ID of the user
     * @return List<ApplicationDTO> - List of user's applications
     */
    List<ApplicationDTO> getApplicationsByUser(Long userId);
    
    /**
     * Get all applications for a user by email
     * @param userEmail - Email of the user
     * @return List<ApplicationDTO> - List of user's applications
     */
    List<ApplicationDTO> getApplicationsByUserEmail(String userEmail);
    
    /**
     * Get all applications for a vacancy
     * @param vacancyId - ID of the vacancy
     * @return List<ApplicationDTO> - List of applications for the vacancy
     */
    List<ApplicationDTO> getApplicationsByVacancy(Long vacancyId);
    
    /**
     * Get applications by status
     * @param status - Application status
     * @return List<ApplicationDTO> - List of applications with the given status
     */
    List<ApplicationDTO> getApplicationsByStatus(ApplicationStatus status);
    
    /**
     * Check if user has already applied for a specific vacancy
     * @param userEmail - Email of the user
     * @param vacancyId - ID of the vacancy
     * @return boolean - true if user has already applied, false otherwise
     */
    boolean hasUserAppliedForVacancy(String userEmail, Long vacancyId);
    
    /**
     * Update application status
     * @param applicationId - ID of the application
     * @param status - New status
     * @return ApplicationDTO - Updated application
     */
    ApplicationDTO updateApplicationStatus(Long applicationId, ApplicationStatus status);
    
    /**
     * Get application by ID with details
     * @param applicationId - ID of the application
     * @return ApplicationDTO - Application details
     */
    ApplicationDTO getApplicationById(Long applicationId);
    
    /**
     * Delete application
     * @param applicationId - ID of the application
     * @return ApiResponse - Success/failure response
     */
    ApiResponse deleteApplication(Long applicationId);
    
    /**
     * Get all applications (for HR dashboard)
     * @return List<ApplicationDTO> - All applications
     */
    List<ApplicationDTO> getAllApplications();
}
