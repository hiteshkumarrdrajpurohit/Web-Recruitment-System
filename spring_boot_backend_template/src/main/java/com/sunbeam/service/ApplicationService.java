package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.JobApplicationDTO;
import com.sunbeam.entity.Application;

public interface ApplicationService {
    
    List<Application> getApplicationsByUserId(Long userId);
    
    Application getApplicationById(Long applicationId);
    
    Application createApplication(Application application);
    
    Application updateApplication(Long applicationId, Application application);
    
    void deleteApplication(Long applicationId);
    
    // New methods for job applications
    Application applyForJob(JobApplicationDTO applicationDTO);
    
    List<Application> getUserAppliedJobs(Long userId);
    
    boolean hasUserAppliedForVacancy(Long userId, Long vacancyId);
} 