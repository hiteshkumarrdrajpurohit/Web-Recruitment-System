package com.sunbeam.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.dto.ApplicationDTO;
import com.sunbeam.service.ApplicationService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/applications")
@RequiredArgsConstructor
public class ApplicationController {

    private final ApplicationService applicationService;

    // Create a new application
    @PostMapping
    public ResponseEntity<ApplicationDTO> createApplication(@RequestBody ApplicationDTO dto) {
        ApplicationDTO created = applicationService.createApplication(dto);
        return ResponseEntity.ok(created);
    }

    // Get all applications
    @GetMapping
    public ResponseEntity<List<ApplicationDTO>> getAllApplications() {
        List<ApplicationDTO> apps = applicationService.getAllApplications();
        return ResponseEntity.ok(apps);
    }

    // Get application by ID
    @GetMapping("/{id}")
    public ResponseEntity<ApplicationDTO> getApplicationById(@PathVariable Long id) {
        ApplicationDTO dto = applicationService.getApplicationById(id);
        return ResponseEntity.ok(dto);
    }

    // Get applications by user ID
    @GetMapping("/user/{userId}")
    public ResponseEntity<List<ApplicationDTO>> getApplicationsByUserId(@PathVariable Long userId) {
        List<ApplicationDTO> apps = applicationService.getApplicationsByUserId(userId);
        return ResponseEntity.ok(apps);
    }

    // Delete an application by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteApplication(@PathVariable Long id) {
        applicationService.deleteApplication(id);
        return ResponseEntity.ok("Application deleted successfully.");
    }
}
