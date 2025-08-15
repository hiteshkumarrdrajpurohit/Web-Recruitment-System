package com.sunbeam.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.custom_exceptions.InvalidInputException;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.ApplicationDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dao.VacancyDao;
import com.sunbeam.dto.ApplicationDTO;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.entity.Application;
import com.sunbeam.entity.User;
import com.sunbeam.entity.Vacancy;
import com.sunbeam.entity.types.ApplicationStatus;

import lombok.AllArgsConstructor;

/**
 * Service implementation for Application operations
 */
@Service
@Transactional
@AllArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationDao applicationDao;
    private final UserDao userDao;
    private final VacancyDao vacancyDao;
    private final ModelMapper modelMapper;

    @Override
    public ApplicationDTO applyForJob(Long userId, Long vacancyId, String coverLetter) {
        // Check if user exists
        User user = userDao.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
        
        // Check if vacancy exists
        Vacancy vacancy = vacancyDao.findById(vacancyId)
            .orElseThrow(() -> new ResourceNotFoundException("Vacancy not found with ID: " + vacancyId));
        
        // Check if user has already applied for this vacancy
        if (applicationDao.existsByUserIdAndVacancyId(userId, vacancyId)) {
            throw new InvalidInputException("You have already applied for this position");
        }
        
        // Create new application
        Application application = new Application();
        application.setUser(user);
        application.setVacancy(vacancy);
        application.setCoverLetter(coverLetter);
        application.setStatus(ApplicationStatus.SUBMITTED);
        
        // Save application
        Application savedApplication = applicationDao.save(application);
        
        // Convert to DTO and return
        ApplicationDTO dto = modelMapper.map(savedApplication, ApplicationDTO.class);
        dto.setApplicantName(user.getFirstName() + " " + user.getLastName());
        dto.setApplicantEmail(user.getEmail());
        dto.setVacancyTitle(vacancy.getTitle());
        
        return dto;
    }

    @Override
    public ApplicationDTO applyForJobByEmail(String userEmail, Long vacancyId, String coverLetter) {
        // Find user by email
        User user = userDao.findByEmail(userEmail)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
        
        // Delegate to the existing method using the user ID
        return applyForJob(user.getId(), vacancyId, coverLetter);
    }

    @Override
    public List<ApplicationDTO> getApplicationsByUser(Long userId) {
        List<Application> applications = applicationDao.findByUserIdWithDetails(userId);
        return applications.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Override
    public List<ApplicationDTO> getApplicationsByUserEmail(String userEmail) {
        // Find user by email first
        User user = userDao.findByEmail(userEmail)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
        
        // Delegate to the existing method using the user ID
        return getApplicationsByUser(user.getId());
    }

    @Override
    public List<ApplicationDTO> getApplicationsByVacancy(Long vacancyId) {
        List<Application> applications = applicationDao.findByVacancyIdWithDetails(vacancyId);
        return applications.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Override
    public List<ApplicationDTO> getApplicationsByStatus(ApplicationStatus status) {
        List<Application> applications = applicationDao.findByStatusWithDetails(status);
        return applications.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Override
    public ApplicationDTO updateApplicationStatus(Long applicationId, ApplicationStatus status) {
        Application application = applicationDao.findById(applicationId)
            .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + applicationId));
        
        application.setStatus(status);
        Application updatedApplication = applicationDao.save(application);
        
        return convertToDTO(updatedApplication);
    }

    @Override
    public ApplicationDTO getApplicationById(Long applicationId) {
        Application application = applicationDao.findByIdWithDetails(applicationId)
            .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + applicationId));
        
        return convertToDTO(application);
    }

    @Override
    public ApiResponse deleteApplication(Long applicationId) {
        if (!applicationDao.existsById(applicationId)) {
            throw new ResourceNotFoundException("Application not found with ID: " + applicationId);
        }
        
        applicationDao.deleteById(applicationId);
        return new ApiResponse("Application deleted successfully");
    }

    @Override
    public List<ApplicationDTO> getAllApplications() {
        List<Application> applications = applicationDao.findAllWithDetails();
        return applications.stream()
            .map(this::convertToDTO)
            .collect(Collectors.toList());
    }

    @Override
    public boolean hasUserAppliedForVacancy(String userEmail, Long vacancyId) {
        // Find user by email
        User user = userDao.findByEmail(userEmail)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with email: " + userEmail));
        
        // Check if user has already applied for this vacancy
        return applicationDao.existsByUserIdAndVacancyId(user.getId(), vacancyId);
    }

    /**
     * Helper method to convert Application entity to DTO
     */
    private ApplicationDTO convertToDTO(Application application) {
        ApplicationDTO dto = modelMapper.map(application, ApplicationDTO.class);
        
        // Set date fields for frontend compatibility
        dto.setCreatedAt(application.getCreatedAt());
        dto.setApplicationDate(application.getCreatedAt());
        
        // Set additional fields for backward compatibility
        if (application.getUser() != null) {
            dto.setApplicantName(application.getUser().getFirstName() + " " + application.getUser().getLastName());
            dto.setApplicantEmail(application.getUser().getEmail());
            dto.setUserId(application.getUser().getId());
            
            // Create nested user object
            ApplicationDTO.UserSummaryDTO userSummary = new ApplicationDTO.UserSummaryDTO();
            userSummary.setId(application.getUser().getId());
            userSummary.setFirstName(application.getUser().getFirstName());
            userSummary.setLastName(application.getUser().getLastName());
            userSummary.setEmail(application.getUser().getEmail());
            userSummary.setPhoneNumber(application.getUser().getPhoneNumber());
            dto.setUser(userSummary);
        }
        
        if (application.getVacancy() != null) {
            dto.setVacancyTitle(application.getVacancy().getTitle());
            dto.setVacancyId(application.getVacancy().getId());
            
            // Create nested vacancy object
            ApplicationDTO.VacancySummaryDTO vacancySummary = new ApplicationDTO.VacancySummaryDTO();
            vacancySummary.setId(application.getVacancy().getId());
            vacancySummary.setTitle(application.getVacancy().getTitle());
            vacancySummary.setDepartment(application.getVacancy().getDepartment());
            vacancySummary.setLocation(application.getVacancy().getLocation());
            dto.setVacancy(vacancySummary);
        }
        
        return dto;
    }
}
