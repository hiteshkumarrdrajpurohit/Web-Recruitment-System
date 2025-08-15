package com.sunbeam.service;

import java.util.List;
import java.util.stream.Collectors;


import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.ApplicationDao;
import com.sunbeam.dao.HrManagerDao;
import com.sunbeam.dao.InterviewDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.InterviewDTO;
import com.sunbeam.entity.Application;
import com.sunbeam.entity.HrManager;
import com.sunbeam.entity.Interview;
import com.sunbeam.entity.types.InterviewStatus;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class InterviewServiceImpl implements InterviewService {

    private final InterviewDao interviewDao;
    private final ApplicationDao applicationDao;
    private final HrManagerDao hrManagerDao;

    @Override
    public List<InterviewDTO> getAllInterviews() {
        List<Interview> interviews = interviewDao.findAllWithDetails();
        return interviews.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public InterviewDTO getInterviewById(Long id) {
        Interview interview = interviewDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found with ID: " + id));
        return convertToDTO(interview);
    }

    @Override
    public InterviewDTO createInterview(InterviewDTO interviewDTO) {
        // Create new Interview entity
        Interview interview = new Interview();
        
        // Set basic fields
        interview.setInterviewerName(interviewDTO.getInterviewerName());
        interview.setScheduledDateTime(interviewDTO.getScheduledDateTime());
        interview.setType(interviewDTO.getType());
        interview.setStatus(interviewDTO.getStatus() != null ? interviewDTO.getStatus() : InterviewStatus.SCHEDULED);
        interview.setFeedback(interviewDTO.getFeedback());
        interview.setMeetUrl(interviewDTO.getMeetUrl());
        interview.setLocation(interviewDTO.getLocation());
        interview.setDuration(interviewDTO.getDuration());
        
        // Set Application relationship
        if (interviewDTO.getApplicationId() != null) {
            Application application = applicationDao.findById(interviewDTO.getApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + interviewDTO.getApplicationId()));
            interview.setApplication(application);
        }
        
        // Set HrManager relationship
        if (interviewDTO.getHrManagerId() != null) {
            HrManager hrManager = hrManagerDao.findById(interviewDTO.getHrManagerId())
                .orElseThrow(() -> new ResourceNotFoundException("HR Manager not found with ID: " + interviewDTO.getHrManagerId()));
            interview.setHrManager(hrManager);
        }
        
        // Save interview
        Interview savedInterview = interviewDao.save(interview);
        
        // Convert to DTO and return
        return convertToDTO(savedInterview);
    }

    @Override
    public InterviewDTO createInterviewByEmail(InterviewDTO interviewDTO, String hrManagerEmail) {
        // Find HR Manager by email
        HrManager hrManager = hrManagerDao.findByUserEmail(hrManagerEmail)
            .orElseThrow(() -> new ResourceNotFoundException("HR Manager not found with email: " + hrManagerEmail));
        
        // Set the HR Manager ID in the DTO
        interviewDTO.setHrManagerId(hrManager.getId());
        
        // Use the existing createInterview method
        return createInterview(interviewDTO);
    }

    @Override
    public InterviewDTO updateInterview(Long id, InterviewDTO interviewDTO) {
        Interview existingInterview = interviewDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found with ID: " + id));
        
        // Update basic fields
        if (interviewDTO.getInterviewerName() != null) {
            existingInterview.setInterviewerName(interviewDTO.getInterviewerName());
        }
        if (interviewDTO.getScheduledDateTime() != null) {
            existingInterview.setScheduledDateTime(interviewDTO.getScheduledDateTime());
        }
        if (interviewDTO.getType() != null) {
            existingInterview.setType(interviewDTO.getType());
        }
        if (interviewDTO.getStatus() != null) {
            existingInterview.setStatus(interviewDTO.getStatus());
        }
        if (interviewDTO.getFeedback() != null) {
            existingInterview.setFeedback(interviewDTO.getFeedback());
        }
        if (interviewDTO.getMeetUrl() != null) {
            existingInterview.setMeetUrl(interviewDTO.getMeetUrl());
        }
        if (interviewDTO.getLocation() != null) {
            existingInterview.setLocation(interviewDTO.getLocation());
        }
        if (interviewDTO.getDuration() != null) {
            existingInterview.setDuration(interviewDTO.getDuration());
        }
        
        // Update Application relationship if provided
        if (interviewDTO.getApplicationId() != null) {
            Application application = applicationDao.findById(interviewDTO.getApplicationId())
                .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + interviewDTO.getApplicationId()));
            existingInterview.setApplication(application);
        }
        
        // Update HrManager relationship if provided
        if (interviewDTO.getHrManagerId() != null) {
            HrManager hrManager = hrManagerDao.findById(interviewDTO.getHrManagerId())
                .orElseThrow(() -> new ResourceNotFoundException("HR Manager not found with ID: " + interviewDTO.getHrManagerId()));
            existingInterview.setHrManager(hrManager);
        }
        
        Interview updatedInterview = interviewDao.save(existingInterview);
        return convertToDTO(updatedInterview);
    }

    @Override
    public ApiResponse deleteInterview(Long id) {
        Interview interview = interviewDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Interview not found with ID: " + id));
        
        interviewDao.delete(interview);
        return new ApiResponse("Interview deleted successfully");
    }

    @Override
    public List<InterviewDTO> getInterviewsByStatus(InterviewStatus status) {
        List<Interview> interviews = interviewDao.findByStatusWithDetails(status);
        return interviews.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public List<InterviewDTO> getInterviewsByApplication(Long applicationId) {
        List<Interview> interviews = interviewDao.findByApplicationIdWithDetails(applicationId);
        return interviews.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    /**
     * Helper method to convert Interview entity to DTO
     */
    private InterviewDTO convertToDTO(Interview interview) {
        InterviewDTO dto = new InterviewDTO();
        
        // Set basic fields
        dto.setId(interview.getId());
        dto.setInterviewerName(interview.getInterviewerName());
        dto.setScheduledDateTime(interview.getScheduledDateTime());
        dto.setScheduledDate(interview.getScheduledDateTime()); // For frontend compatibility
        dto.setInterviewDate(interview.getScheduledDateTime()); // For frontend compatibility
        dto.setType(interview.getType());
        dto.setStatus(interview.getStatus());
        dto.setFeedback(interview.getFeedback());
        dto.setMeetUrl(interview.getMeetUrl());
        dto.setLocation(interview.getLocation());
        dto.setDuration(interview.getDuration());
        
        // Set Application-related fields
        if (interview.getApplication() != null) {
            dto.setApplicationId(interview.getApplication().getId());
            
            // Create nested application object
            InterviewDTO.ApplicationSummaryDTO applicationSummary = new InterviewDTO.ApplicationSummaryDTO();
            applicationSummary.setId(interview.getApplication().getId());
            
            if (interview.getApplication().getUser() != null) {
                dto.setApplicantName(interview.getApplication().getUser().getFirstName() + " " + 
                                   interview.getApplication().getUser().getLastName());
                dto.setApplicantEmail(interview.getApplication().getUser().getEmail());
                
                // Create nested user object
                InterviewDTO.ApplicationSummaryDTO.UserSummaryDTO userSummary = 
                    new InterviewDTO.ApplicationSummaryDTO.UserSummaryDTO();
                userSummary.setId(interview.getApplication().getUser().getId());
                userSummary.setFirstName(interview.getApplication().getUser().getFirstName());
                userSummary.setLastName(interview.getApplication().getUser().getLastName());
                userSummary.setEmail(interview.getApplication().getUser().getEmail());
                userSummary.setPhoneNumber(interview.getApplication().getUser().getPhoneNumber());
                applicationSummary.setUser(userSummary);
            }
            
            if (interview.getApplication().getVacancy() != null) {
                dto.setVacancyTitle(interview.getApplication().getVacancy().getTitle());
                
                // Create nested vacancy object
                InterviewDTO.ApplicationSummaryDTO.VacancySummaryDTO vacancySummary = 
                    new InterviewDTO.ApplicationSummaryDTO.VacancySummaryDTO();
                vacancySummary.setId(interview.getApplication().getVacancy().getId());
                vacancySummary.setTitle(interview.getApplication().getVacancy().getTitle());
                vacancySummary.setDepartment(interview.getApplication().getVacancy().getDepartment());
                vacancySummary.setLocation(interview.getApplication().getVacancy().getLocation());
                applicationSummary.setVacancy(vacancySummary);
            }
            
            dto.setApplication(applicationSummary);
        }
        
        // Set HrManager-related fields
        if (interview.getHrManager() != null) {
            dto.setHrManagerId(interview.getHrManager().getId());
            if (interview.getHrManager().getUser() != null) {
                dto.setHrManagerName(interview.getHrManager().getUser().getFirstName() + " " + 
                                   interview.getHrManager().getUser().getLastName());
            }
        }
        
        return dto;
    }
}
