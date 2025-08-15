package com.sunbeam.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.HiringDTO;
import com.sunbeam.entity.types.Decision;
import com.sunbeam.service.HiringService;

import lombok.AllArgsConstructor;

/**
 * REST Controller for Hiring operations
 * Handles all hiring decision-related HTTP requests
 */
@RestController
@RequestMapping("/hirings")
@AllArgsConstructor
public class HiringController {

    private final HiringService hiringService;

    /**
     * Get all hiring decisions (HR only)
     * @return List of all hiring decisions
     */
    @GetMapping
    @PreAuthorize("hasRole('HRMANAGER')")
    public ResponseEntity<List<HiringDTO>> getAllHirings() {
        List<HiringDTO> hirings = hiringService.getAllHirings();
        return ResponseEntity.ok(hirings);
    }

    /**
     * Get hiring decision by ID
     * @param id - Hiring ID
     * @return Hiring decision details
     */
    @GetMapping("/{id}")
    @PreAuthorize("hasRole('HRMANAGER')")
    public ResponseEntity<HiringDTO> getHiringById(@PathVariable Long id) {
        HiringDTO hiring = hiringService.getHiringById(id);
        return ResponseEntity.ok(hiring);
    }

    /**
     * Create new hiring decision (HR only)
     * @param hiringDTO - Hiring decision details
     * @param authentication - Current user authentication
     * @return Created hiring decision
     */
    @PostMapping
    @PreAuthorize("hasRole('HRMANAGER')")
    public ResponseEntity<HiringDTO> createHiring(@RequestBody HiringDTO hiringDTO, Authentication authentication) {
        String hrEmail = authentication.getName();
        HiringDTO createdHiring = hiringService.createHiringByEmail(hiringDTO, hrEmail);
        return ResponseEntity.ok(createdHiring);
    }

    /**
     * Update hiring decision (HR only)
     * @param id - Hiring ID
     * @param hiringDTO - Updated hiring decision details
     * @return Updated hiring decision
     */
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('HRMANAGER')")
    public ResponseEntity<HiringDTO> updateHiring(@PathVariable Long id, @RequestBody HiringDTO hiringDTO) {
        HiringDTO updatedHiring = hiringService.updateHiring(id, hiringDTO);
        return ResponseEntity.ok(updatedHiring);
    }

    /**
     * Delete hiring decision (HR only)
     * @param id - Hiring ID
     * @return Success response
     */
    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('HRMANAGER')")
    public ResponseEntity<ApiResponse> deleteHiring(@PathVariable Long id) {
        ApiResponse response = hiringService.deleteHiring(id);
        return ResponseEntity.ok(response);
    }

    /**
     * Get hiring decisions by decision type
     * @param decision - Hiring decision (HIRED/REJECTED)
     * @return List of hiring decisions with the given decision
     */
    @GetMapping("/decision/{decision}")
    @PreAuthorize("hasRole('HRMANAGER')")
    public ResponseEntity<List<HiringDTO>> getHiringsByDecision(@PathVariable Decision decision) {
        List<HiringDTO> hirings = hiringService.getHiringsByDecision(decision);
        return ResponseEntity.ok(hirings);
    }

    /**
     * Get hiring decisions by application ID
     * @param applicationId - Application ID
     * @return Hiring decision for the application
     */
    @GetMapping("/application/{applicationId}")
    @PreAuthorize("hasRole('HRMANAGER')")
    public ResponseEntity<HiringDTO> getHiringByApplication(@PathVariable Long applicationId) {
        HiringDTO hiring = hiringService.getHiringByApplication(applicationId);
        return ResponseEntity.ok(hiring);
    }
}
