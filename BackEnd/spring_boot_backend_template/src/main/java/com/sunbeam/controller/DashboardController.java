package com.sunbeam.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.DashboardStatsDTO;
import com.sunbeam.service.DashboardService;

import lombok.AllArgsConstructor;

/**
 * REST Controller for Dashboard operations
 * Provides aggregated data for dashboard views
 */
@RestController
@RequestMapping("/dashboard")
@AllArgsConstructor
public class DashboardController {

    private final DashboardService dashboardService;

    /**
     * Get HR dashboard statistics
     * @return Dashboard stats including vacancies, applications, interviews, etc.
     */
    @GetMapping("/hr/stats")
    @PreAuthorize("hasRole('HRMANAGER')")
    public ResponseEntity<DashboardStatsDTO> getHRDashboardStats() {
        DashboardStatsDTO stats = dashboardService.getHRDashboardStats();
        return ResponseEntity.ok(stats);
    }

    /**
     * Get applicant dashboard stats
     * @return Dashboard stats for applicant (applications count, etc.)
     */
    @GetMapping("/applicant/stats")
    @PreAuthorize("hasRole('USER')")
    public ResponseEntity<DashboardStatsDTO> getApplicantDashboardStats() {
        DashboardStatsDTO stats = dashboardService.getApplicantDashboardStats();
        return ResponseEntity.ok(stats);
    }
}
