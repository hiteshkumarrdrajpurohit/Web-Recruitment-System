package com.sunbeam.dto;

import java.time.LocalDateTime;

import com.sunbeam.entity.types.InterviewStatus;
import com.sunbeam.entity.types.InterviewType;

import lombok.Getter;
import lombok.Setter;

/**
 * DTO for Interview entity
 * Contains all necessary fields for interview management
 */
@Getter
@Setter
public class InterviewDTO {
    private Long id;
    private Long applicationId;
    private String applicantName;
    private String applicantEmail;
    private String vacancyTitle;
    private String interviewerName;
    private LocalDateTime scheduledDateTime;
    private LocalDateTime scheduledDate; // For frontend compatibility
    private LocalDateTime interviewDate; // For frontend compatibility
    private InterviewType type;
    private InterviewStatus status;
    private String feedback;
    private String meetUrl;
    private String location;
    private Integer duration;
    private Long hrManagerId;
    private String hrManagerName;
    
    // Nested objects for frontend compatibility
    private ApplicationSummaryDTO application;
    
    @Getter
    @Setter
    public static class ApplicationSummaryDTO {
        private Long id;
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
}
