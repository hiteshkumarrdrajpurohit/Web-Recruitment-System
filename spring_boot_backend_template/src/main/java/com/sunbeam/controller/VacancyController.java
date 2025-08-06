package com.sunbeam.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.entity.Vacancy;
import com.sunbeam.service.VacancyService;

import io.swagger.v3.oas.annotations.Operation;
import jakarta.validation.Valid;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/vacancies")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:4173", "http://127.0.0.1:5173"}, allowCredentials = "true")
@AllArgsConstructor
public class VacancyController {

    private final VacancyService vacancyService;

    @GetMapping
    @Operation(summary = "Get all vacancies", description = "Retrieve all vacancies with optional search and pagination")
    public ResponseEntity<ApiResponse> getAllVacancies(
            @RequestParam(required = false) String searchTerm,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "id") String sortBy) {
        try {
            List<Vacancy> vacancies = vacancyService.getAllVacancies(searchTerm, page, size, sortBy);
            return ResponseEntity.ok(new ApiResponse(true, "Vacancies retrieved successfully", vacancies));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(false, "Error retrieving vacancies", null));
        }
    }

    @GetMapping("/active")
    @Operation(summary = "Get active job listings", description = "Retrieve all active job listings with filtering and pagination")
    public ResponseEntity<ApiResponse> getActiveJobListings(
            @RequestParam(required = false) String searchTerm,
            @RequestParam(required = false) String location,
            @RequestParam(required = false) String jobType,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy) {
        try {
            List<Vacancy> vacancies = vacancyService.getActiveJobListings(searchTerm, location, jobType, page, size, sortBy);
            return ResponseEntity.ok(new ApiResponse(true, "Active job listings retrieved successfully", vacancies));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(false, "Error retrieving active job listings", null));
        }
    }

    @GetMapping("/{vacancyId}")
    @Operation(summary = "Get vacancy by ID", description = "Retrieve a specific vacancy by its ID")
    public ResponseEntity<ApiResponse> getVacancyById(@PathVariable Long vacancyId) {
        try {
            Vacancy vacancy = vacancyService.getVacancyById(vacancyId);
            if (vacancy == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(new ApiResponse(true, "Vacancy retrieved successfully", vacancy));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(false, "Error retrieving vacancy", null));
        }
    }

    @PostMapping
    @Operation(summary = "Create new vacancy", description = "Create a new job vacancy")
    public ResponseEntity<ApiResponse> createVacancy(@RequestBody @Valid Vacancy vacancy, @RequestParam Long hrManagerId) {
        try {
            Vacancy createdVacancy = vacancyService.createVacancy(vacancy, hrManagerId);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(new ApiResponse(true, "Vacancy created successfully", createdVacancy));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage(), null));
        } catch (Exception e) {
            e.printStackTrace(); // Log the full stack trace for debugging
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, "Error creating vacancy: " + e.getMessage(), null));
        }
    }

    @PutMapping("/{vacancyId}")
    @Operation(summary = "Update vacancy", description = "Update an existing vacancy by ID")
    public ResponseEntity<ApiResponse> updateVacancy(@PathVariable Long vacancyId, @RequestBody @Valid Vacancy vacancy) {
        try {
            Vacancy updatedVacancy = vacancyService.updateVacancy(vacancyId, vacancy);
            if (updatedVacancy == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(new ApiResponse(true, "Vacancy updated successfully", updatedVacancy));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(false, "Error updating vacancy", null));
        }
    }

    @DeleteMapping("/{vacancyId}")
    @Operation(summary = "Delete vacancy", description = "Delete a vacancy by ID")
    public ResponseEntity<ApiResponse> deleteVacancy(@PathVariable Long vacancyId) {
        try {
            boolean deleted = vacancyService.deleteVacancy(vacancyId);
            if (!deleted) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(new ApiResponse(true, "Vacancy deleted successfully", null));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage(), null));
        } catch (Exception e) {
            return ResponseEntity.internalServerError().body(new ApiResponse(false, "Error deleting vacancy", null));
        }
    }
}
