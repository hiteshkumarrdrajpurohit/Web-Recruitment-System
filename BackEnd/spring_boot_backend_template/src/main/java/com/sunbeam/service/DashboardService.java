package com.sunbeam.service;

import com.sunbeam.dto.DashboardStatsDTO;

/**
 * Service interface for Dashboard operations
 * Provides aggregated statistics for dashboard views
 */
public interface DashboardService {
    
    /**
     * Get HR dashboard statistics
     * @return Aggregated stats for HR dashboard
     */
    DashboardStatsDTO getHRDashboardStats();
    
    /**
     * Get applicant dashboard statistics
     * @return Aggregated stats for applicant dashboard
     */
    DashboardStatsDTO getApplicantDashboardStats();
}
