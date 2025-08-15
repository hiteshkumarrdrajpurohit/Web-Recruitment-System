package com.sunbeam.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.dao.ApplicationDao;
import com.sunbeam.dao.HiringDao;
import com.sunbeam.dao.InterviewDao;
import com.sunbeam.dao.VacancyDao;
import com.sunbeam.dto.DashboardStatsDTO;

import com.sunbeam.entity.types.Decision;
import com.sunbeam.entity.types.InterviewStatus;
import com.sunbeam.entity.types.JobStatus;

import lombok.AllArgsConstructor;

/**
 * Service implementation for Dashboard operations
 * Calculates and provides aggregated statistics
 */
@Service
@Transactional(readOnly = true)
@AllArgsConstructor
public class DashboardServiceImpl implements DashboardService {

    private final VacancyDao vacancyDao;
    private final ApplicationDao applicationDao;
    private final InterviewDao interviewDao;
    private final HiringDao hiringDao;

    @Override
    public DashboardStatsDTO getHRDashboardStats() {
        DashboardStatsDTO stats = new DashboardStatsDTO();
        
        // Vacancy statistics
        stats.setTotalVacancies((int) vacancyDao.count());
        stats.setOpenVacancies((int) vacancyDao.countByStatus(JobStatus.ACTIVE));
        
        // Application statistics
        stats.setTotalApplications((int) applicationDao.getTotalApplicationsCount());
        stats.setTotalApplicants((int) applicationDao.count()); // Assuming each application is from a different user
        
        // Interview statistics
        stats.setScheduledInterviews((int) interviewDao.countByStatus(InterviewStatus.SCHEDULED));
        stats.setCompletedInterviews((int) interviewDao.countByStatus(InterviewStatus.COMPLETED));
        
        // Hiring statistics
        stats.setHiredCount((int) hiringDao.countByDecision(Decision.SELECTED));
        stats.setRejectedCount((int) hiringDao.countByDecision(Decision.REJECTED));
        
        // Calculate rates
        if (stats.getTotalApplications() > 0) {
            stats.setHiringRate((double) stats.getHiredCount() / stats.getTotalApplications() * 100);
        }
        
        if (stats.getCompletedInterviews() > 0) {
            stats.setInterviewRate((double) stats.getHiredCount() / stats.getCompletedInterviews() * 100);
        }
        
        return stats;
    }

    @Override
    public DashboardStatsDTO getApplicantDashboardStats() {
        DashboardStatsDTO stats = new DashboardStatsDTO();
        
        // For applicant dashboard, we would need user context
        // This is a simplified version - in real implementation,
        // you would get stats specific to the logged-in user
        
        stats.setTotalVacancies((int) vacancyDao.countByStatus(JobStatus.ACTIVE));
        stats.setOpenVacancies((int) vacancyDao.countByStatus(JobStatus.ACTIVE));
        
        return stats;
    }
}
