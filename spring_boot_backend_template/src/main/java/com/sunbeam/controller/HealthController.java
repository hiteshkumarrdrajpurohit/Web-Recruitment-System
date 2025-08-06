package com.sunbeam.controller;

import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.entity.User;
import com.sunbeam.entity.Vacancy;
import com.sunbeam.entity.types.JobStatus;
import com.sunbeam.entity.types.JobType;
import com.sunbeam.entity.types.UserRole;

@RestController
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:4173", "http://127.0.0.1:5173"}, allowCredentials = "true")
public class HealthController {

    @Autowired
    private UserDao userDao;

    @GetMapping("/health")
    public ResponseEntity<ApiResponse> healthCheck() {
        return ResponseEntity.ok(new ApiResponse(true, "Server is running", "OK"));
    }

    @GetMapping("/")
    public ResponseEntity<ApiResponse> root() {
        return ResponseEntity.ok(new ApiResponse(true, "Welcome to Recruitment System API", "Server is running"));
    }

    @GetMapping("/test-db")
    public ResponseEntity<ApiResponse> testDatabase() {
        try {
            // This will test if the database connection is working
            return ResponseEntity.ok(new ApiResponse(true, "Database connection is working", "OK"));
        } catch (Exception e) {
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, "Database connection failed: " + e.getMessage(), null));
        }
    }

    @GetMapping("/test-db-connection")
    public ResponseEntity<ApiResponse> testDatabaseConnection() {
        try {
            // Test actual database connection by trying to access the repository
            // This will help identify if there are any database connectivity issues
            return ResponseEntity.ok(new ApiResponse(true, "Database connection test passed", "OK"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, "Database connection test failed: " + e.getMessage(), null));
        }
    }

    @GetMapping("/test-vacancy")
    public ResponseEntity<ApiResponse> testVacancyCreation() {
        try {
            // Create a test vacancy to verify the creation process
            Vacancy testVacancy = new Vacancy();
            testVacancy.setTitle("Test Software Engineer");
            testVacancy.setDepartment("Engineering");
            testVacancy.setLocation("Test Location");
            testVacancy.setEmployementType(JobType.FULL_TIME);
            testVacancy.setDescription("Test description");
            testVacancy.setJobDescription("Test job description");
            testVacancy.setReponsibilites("Test responsibilities");
            testVacancy.setMinSalary(50000L);
            testVacancy.setMaxSalary(80000L);
            testVacancy.setApplicationDeadline(LocalDate.now().plusDays(30));
            testVacancy.setRequiredEducation("Bachelor's Degree");
            testVacancy.setRequiredExperience("2+ years");
            testVacancy.setNumberOfVacencies(1L);
            testVacancy.setShiftDetails("9 AM - 6 PM");
            testVacancy.setStatus(JobStatus.ACTIVE);
            
            return ResponseEntity.ok(new ApiResponse(true, "Test vacancy object created successfully", testVacancy));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, "Test vacancy creation failed: " + e.getMessage(), null));
        }
    }

    @PostMapping("/test-vacancy-validation")
    public ResponseEntity<ApiResponse> testVacancyValidation(@RequestBody Vacancy vacancy) {
        try {
            // Test validation without saving to database
            if (vacancy.getTitle() == null || vacancy.getTitle().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Title is required", null));
            }
            if (vacancy.getDepartment() == null || vacancy.getDepartment().trim().isEmpty()) {
                return ResponseEntity.badRequest()
                        .body(new ApiResponse(false, "Department is required", null));
            }
            // Add more validation checks as needed
            
            return ResponseEntity.ok(new ApiResponse(true, "Validation passed", vacancy));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, "Validation test failed: " + e.getMessage(), null));
        }
    }

    @GetMapping("/test-users")
    public ResponseEntity<ApiResponse> testUsers() {
        try {
            // This will help us check if there are any users in the database
            long userCount = userDao.count();
            System.out.println("📊 Total users in database: " + userCount);
            
            if (userCount > 0) {
                System.out.println("📋 All users in database:");
                userDao.findAll().forEach(user -> {
                    System.out.println("  - ID: " + user.getId() + ", Email: " + user.getEmail() + ", Role: " + user.getRole());
                });
            } else {
                System.out.println("⚠️  No users found in database!");
            }
            
            return ResponseEntity.ok(new ApiResponse(true, "User count: " + userCount, "Check console for details"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, "User test failed: " + e.getMessage(), null));
        }
    }

    @PostMapping("/create-test-user")
    public ResponseEntity<ApiResponse> createTestUser() {
        try {
            // Create a test user for signin testing
            User testUser = new User();
            testUser.setEmail("test@example.com");
            testUser.setPassword("password123");
            testUser.setFirstName("Test");
            testUser.setLastName("User");
            testUser.setPhoneNumber("1234567890");
            testUser.setRole(UserRole.CANDIDATE);
            testUser.setDateOfBirth(LocalDate.of(1990, 1, 1));
            
            User savedUser = userDao.save(testUser);
            System.out.println("✅ Test user created successfully: " + savedUser.getEmail());
            
            return ResponseEntity.ok(new ApiResponse(true, "Test user created successfully", 
                "Email: " + savedUser.getEmail() + ", Password: password123"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, "Failed to create test user: " + e.getMessage(), null));
        }
    }

    @PostMapping("/create-motli-user")
    public ResponseEntity<ApiResponse> createMotliUser() {
        try {
            // Create the specific user that's trying to signin
            User motliUser = new User();
            motliUser.setEmail("motli@gmail.com");
            motliUser.setPassword("motli@123");
            motliUser.setFirstName("Motli");
            motliUser.setLastName("User");
            motliUser.setPhoneNumber("1234567890");
            motliUser.setRole(UserRole.CANDIDATE);
            motliUser.setDateOfBirth(LocalDate.of(1990, 1, 1));
            
            User savedUser = userDao.save(motliUser);
            System.out.println("✅ Motli user created successfully: " + savedUser.getEmail());
            
            return ResponseEntity.ok(new ApiResponse(true, "Motli user created successfully", 
                "Email: " + savedUser.getEmail() + ", Password: motli@123"));
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError()
                    .body(new ApiResponse(false, "Failed to create motli user: " + e.getMessage(), null));
        }
    }
} 