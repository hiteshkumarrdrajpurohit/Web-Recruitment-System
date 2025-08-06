package com.sunbeam.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.entity.Application;
import com.sunbeam.service.ApplicationService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/applications")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:4173", "http://127.0.0.1:5173"}, allowCredentials = "true")
@AllArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    @GetMapping("/user/{userId}")
    @Operation(description = "Get all applications for a user")
    public ResponseEntity<ApiResponse> getUserApplications(@PathVariable Long userId) {
        try {
            List<Application> applications = applicationService.getApplicationsByUserId(userId);
            return ResponseEntity.ok(new ApiResponse(true, "Applications retrieved successfully", applications));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage(), null));
        }
    }

    @GetMapping("/{applicationId}")
    @Operation(description = "Get application by ID")
    public ResponseEntity<ApiResponse> getApplicationById(@PathVariable Long applicationId) {
        try {
            Application application = applicationService.getApplicationById(applicationId);
            return ResponseEntity.ok(new ApiResponse(true, "Application retrieved successfully", application));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage(), null));
        }
    }

    @PostMapping
    @Operation(description = "Create new application")
    public ResponseEntity<ApiResponse> createApplication(@RequestBody Application application) {
        try {
            Application createdApplication = applicationService.createApplication(application);
            return ResponseEntity.ok(new ApiResponse(true, "Application created successfully", createdApplication));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage(), null));
        }
    }
} 