package com.sunbeam.dto;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.sunbeam.entity.types.Decision;

import lombok.Getter;
import lombok.Setter;

/**
 * DTO for Hirings entity
 * Contains all necessary fields for hiring decisions
 */
@Getter
@Setter
public class HiringDTO {
    private Long id;
    private Long applicationId;
    private String applicantName;
    private String applicantEmail;
    private Long vacancyId;
    private String vacancyTitle;
    private String interviewerName;
    private Decision decision;
    private Long salaryOffered;
    private LocalDate startDate;
    private Long hrManagerId;
    private String hrManagerName;
    private String notes;
    private LocalDateTime decidedDate;
    private LocalDateTime createdAt;
    
    // Nested objects for rich display
    private ApplicationSummaryDTO application;
    private VacancySummaryDTO vacancy;
    private HrManagerSummaryDTO hrManager;

    @Getter
    @Setter
    public static class ApplicationSummaryDTO {
        private Long id;
        private String status;
        private LocalDateTime appliedDate;
        private String coverLetter;
        
        // User details
        private UserSummaryDTO user;
        
        @Getter
        @Setter
        public static class UserSummaryDTO {
            private Long id;
            private String firstName;
            private String lastName;
            private String email;
            private String phoneNumber;
        }
    }

    @Getter
    @Setter
    public static class VacancySummaryDTO {
        private Long id;
        private String title;
        private String department;
        private String location;
        private String description;
    }

    @Getter
    @Setter
    public static class HrManagerSummaryDTO {
        private Long id;
        private String departmentName;
        private String firstName;
        private String lastName;
        private String email;
    }
}
