package com.sunbeam.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.ApplicationDTO;
import com.sunbeam.entity.types.ApplicationStatus;
import com.sunbeam.service.ApplicationService;

import lombok.AllArgsConstructor;

/**
 * REST Controller for Application operations
 * Handles all application-related HTTP requests
 */
@RestController
@RequestMapping("/applications")
@AllArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    /**
     * Apply for a job vacancy
     * @param vacancyId - Vacancy ID
     * @param coverLetter - Cover letter (optional)
     * @param authentication - Current user authentication
     * @return Created application
     */
    @PostMapping("/apply")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<ApplicationDTO> applyForJob(
            @RequestParam Long vacancyId,
            @RequestParam(required = false) String coverLetter,
            Authentication authentication) {
        
        String userEmail = authentication.getName();
        ApplicationDTO application = applicationService.applyForJobByEmail(userEmail, vacancyId, coverLetter);
        return ResponseEntity.ok(application);
    }

    /**
     * Get applications by user (for applicant dashboard)
     * @param userId - User ID
     * @return List of user's applications
     */
    @GetMapping("/user/{userId}")
    @PreAuthorize("hasRole('USER') or hasRole('HRMANAGER')")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsByUser(@PathVariable Long userId) {
        List<ApplicationDTO> applications = applicationService.getApplicationsByUser(userId);
        return ResponseEntity.ok(applications);
    }

    /**
     * Get current user's applications (for authenticated user)
     * @param authentication - Current user authentication
     * @return List of current user's applications
     */
    @GetMapping("/my")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<List<ApplicationDTO>> getMyApplications(Authentication authentication) {
        String userEmail = authentication.getName();
        List<ApplicationDTO> applications = applicationService.getApplicationsByUserEmail(userEmail);
        return ResponseEntity.ok(applications);
    }

    /**
     * Check if current user has already applied for a specific vacancy
     * @param vacancyId - Vacancy ID to check
     * @param authentication - Current user authentication
     * @return Boolean response indicating if user has applied
     */
    @GetMapping("/check-applied/{vacancyId}")
    @PreAuthorize("hasRole('USER') or hasRole('HRMANAGER')")
    public ResponseEntity<Boolean> hasAppliedForVacancy(
            @PathVariable Long vacancyId,
            Authentication authentication) {
        
        String userEmail = authentication.getName();
        boolean hasApplied = applicationService.hasUserAppliedForVacancy(userEmail, vacancyId);
        return ResponseEntity.ok(hasApplied);
    }

    /**
     * Get applications by vacancy (for HR)
     * @param vacancyId - Vacancy ID
     * @return List of applications for the vacancy
     */
    @GetMapping("/vacancy/{vacancyId}")
    @PreAuthorize("hasRole('HRMANAGER')")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsByVacancy(@PathVariable Long vacancyId) {
        List<ApplicationDTO> applications = applicationService.getApplicationsByVacancy(vacancyId);
        return ResponseEntity.ok(applications);
    }

    /**
     * Get all applications (for HR dashboard)
     * @return List of all applications
     */
    @GetMapping
    @PreAuthorize("hasRole('HRMANAGER')")
    public ResponseEntity<List<ApplicationDTO>> getAllApplications() {
        List<ApplicationDTO> applications = applicationService.getAllApplications();
        return ResponseEntity.ok(applications);
    }

    /**
     * Get applications by status
     * @param status - Application status
     * @return List of applications with the given status
     */
    @GetMapping("/status/{status}")
    @PreAuthorize("hasRole('HRMANAGER')")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsByStatus(@PathVariable ApplicationStatus status) {
        List<ApplicationDTO> applications = applicationService.getApplicationsByStatus(status);
        return ResponseEntity.ok(applications);
    }

    /**
     * Get application by ID
     * @param id - Application ID
     * @return Application details
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('HRMANAGER')")
    public ResponseEntity<ApplicationDTO> getApplicationById(@PathVariable Long id) {
        ApplicationDTO application = applicationService.getApplicationById(id);
        return ResponseEntity.ok(application);
    }

    /**
     * Update application status (HR only)
     * @param id - Application ID
     * @param status - New status
     * @return Updated application
     */
    @PutMapping("/{id}/status/{status}")
    @PreAuthorize("hasRole('HRMANAGER')")
    public ResponseEntity<ApplicationDTO> updateApplicationStatus(
            @PathVariable Long id,
            @PathVariable ApplicationStatus status) {
        
        ApplicationDTO application = applicationService.updateApplicationStatus(id, status);
        return ResponseEntity.ok(application);
    }

    /**
     * Delete application
     * @param id - Application ID
     * @return Success response
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('HRMANAGER')")
    public ResponseEntity<ApiResponse> deleteApplication(@PathVariable Long id) {
        ApiResponse response = applicationService.deleteApplication(id);
        return ResponseEntity.ok(response);
    }
}
