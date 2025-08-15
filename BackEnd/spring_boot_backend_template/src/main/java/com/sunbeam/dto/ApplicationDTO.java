package com.sunbeam.dto;

import java.time.LocalDateTime;

import com.sunbeam.entity.types.ApplicationStatus;

import lombok.Getter;
import lombok.Setter;

/**
 * DTO for Application entity
 * Contains all necessary fields for application management
 */
@Getter
@Setter
public class ApplicationDTO {
    private Long id;
    private Long vacancyId;
    private String vacancyTitle;
    private Long userId;
    private String applicantName;
    private String applicantEmail;
    private ApplicationStatus status;
    private String coverLetter;
    private String resumeFileName;
    private String resumeFilePath;
    private LocalDateTime appliedDate;
    private LocalDateTime updatedDate;
    private LocalDateTime createdAt;
    private LocalDateTime applicationDate;
    
    // Nested objects for frontend compatibility
    private UserSummaryDTO user;
    private VacancySummaryDTO vacancy;
    
    @Getter
    @Setter
    public static class UserSummaryDTO {
        private Long id;
        private String firstName;
        private String lastName;
        private String email;
        private String phoneNumber;
    }
    
    @Getter
    @Setter
    public static class VacancySummaryDTO {
        private Long id;
        private String title;
        private String department;
        private String location;
    }
}
