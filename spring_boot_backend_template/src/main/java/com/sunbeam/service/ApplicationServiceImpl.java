package com.sunbeam.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.sunbeam.custom_exceptions.InvalidInputException;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.ApplicationDao;
import com.sunbeam.dto.JobApplicationDTO;
import com.sunbeam.entity.Application;
import com.sunbeam.entity.User;
import com.sunbeam.entity.Vacancy;
import com.sunbeam.entity.types.ApplicationStatus;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationDao applicationDao;
    private final UserService userService;
    private final VacancyService vacancyService;

    @Override
    public List<Application> getApplicationsByUserId(Long userId) {
        User user = userService.getUserById(userId);
        if (user == null) {
            throw new ResourceNotFoundException("User not found with id: " + userId);
        }
        return applicationDao.findByUserId(userId);
    }

    @Override
    public Application getApplicationById(Long applicationId) {
        return applicationDao.findById(applicationId)
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with id: " + applicationId));
    }

    @Override
    public Application createApplication(Application application) {
        return applicationDao.save(application);
    }

    @Override
    public Application updateApplication(Long applicationId, Application application) {
        Application existingApplication = getApplicationById(applicationId);
        
        // Update fields
        existingApplication.setStatus(application.getStatus());
        existingApplication.setCoverLetter(application.getCoverLetter());
        existingApplication.setResumeFileName(application.getResumeFileName());
        existingApplication.setResumeFilePath(application.getResumeFilePath());
        
        return applicationDao.save(existingApplication);
    }

    @Override
    public void deleteApplication(Long applicationId) {
        Application application = getApplicationById(applicationId);
        applicationDao.delete(application);
    }

    @Override
    public Application applyForJob(JobApplicationDTO applicationDTO) {
        // Check if user exists
        User user = userService.getUserById(applicationDTO.getUserId());
        if (user == null) {
            throw new ResourceNotFoundException("User not found with id: " + applicationDTO.getUserId());
        }
        
        // Check if vacancy exists
        Vacancy vacancy = vacancyService.getVacancyById(applicationDTO.getVacancyId());
        if (vacancy == null) {
            throw new ResourceNotFoundException("Vacancy not found with id: " + applicationDTO.getVacancyId());
        }
        
        // Check if user has already applied for this vacancy
        if (hasUserAppliedForVacancy(applicationDTO.getUserId(), applicationDTO.getVacancyId())) {
            throw new InvalidInputException("You have already applied for this job");
        }
        
        // Create new application
        Application application = new Application();
        application.setUser(user);
        application.setVacancy(vacancy);
        application.setStatus(ApplicationStatus.SUBMITTED);
        application.setCoverLetter(applicationDTO.getCoverLetter());
        application.setResumeFileName(applicationDTO.getResumeFileName());
        application.setResumeFilePath(applicationDTO.getResumeFilePath());
        
        return applicationDao.save(application);
    }

    @Override
    public List<Application> getUserAppliedJobs(Long userId) {
        return getApplicationsByUserId(userId);
    }

    @Override
    public boolean hasUserAppliedForVacancy(Long userId, Long vacancyId) {
        List<Application> applications = applicationDao.findByUserIdAndVacancyId(userId, vacancyId);
        return !applications.isEmpty();
    }
} 