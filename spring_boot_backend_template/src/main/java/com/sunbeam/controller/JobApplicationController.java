package com.sunbeam.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.JobApplicationDTO;
import com.sunbeam.entity.Application;
import com.sunbeam.service.ApplicationService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/job-applications")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:4173", "http://127.0.0.1:5173"}, allowCredentials = "true")
@AllArgsConstructor
public class JobApplicationController {

    private final ApplicationService applicationService;

    @PostMapping("/apply")
    @Operation(description = "Apply for a job")
    public ResponseEntity<ApiResponse> applyForJob(@RequestBody JobApplicationDTO applicationDTO) {
        try {
            Application application = applicationService.applyForJob(applicationDTO);
            return ResponseEntity.ok(new ApiResponse(true, "Application submitted successfully", application));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage(), null));
        }
    }

    @GetMapping("/user/{userId}/applied")
    @Operation(description = "Get all jobs applied by a user")
    public ResponseEntity<ApiResponse> getUserAppliedJobs(@PathVariable Long userId) {
        try {
            var appliedJobs = applicationService.getUserAppliedJobs(userId);
            return ResponseEntity.ok(new ApiResponse(true, "Applied jobs retrieved successfully", appliedJobs));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage(), null));
        }
    }

    @GetMapping("/user/{userId}/vacancy/{vacancyId}")
    @Operation(description = "Check if user has applied for a specific vacancy")
    public ResponseEntity<ApiResponse> checkUserApplication(@PathVariable Long userId, @PathVariable Long vacancyId) {
        try {
            boolean hasApplied = applicationService.hasUserAppliedForVacancy(userId, vacancyId);
            return ResponseEntity.ok(new ApiResponse(true, "Application status checked", hasApplied));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage(), null));
        }
    }
} 