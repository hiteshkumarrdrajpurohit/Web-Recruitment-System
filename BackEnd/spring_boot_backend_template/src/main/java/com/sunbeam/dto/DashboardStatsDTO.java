package com.sunbeam.dto;

import lombok.Getter;
import lombok.Setter;

/**
 * DTO for Dashboard Statistics
 * Contains aggregated data for HR dashboard
 */
@Getter
@Setter
public class DashboardStatsDTO {
    private int totalVacancies;
    private int openVacancies;
    private int totalApplications;
    private int totalApplicants;
    private int scheduledInterviews;
    private int completedInterviews;
    private int hiredCount;
    private int rejectedCount;
    private double hiringRate;
    private double interviewRate;
}
