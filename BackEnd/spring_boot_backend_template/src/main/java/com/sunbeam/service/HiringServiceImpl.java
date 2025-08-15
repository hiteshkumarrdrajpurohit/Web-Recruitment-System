package com.sunbeam.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.ApplicationDao;
import com.sunbeam.dao.HiringDao;
import com.sunbeam.dao.HrManagerDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dao.VacancyDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.HiringDTO;
import com.sunbeam.entity.Application;
import com.sunbeam.entity.Hirings;
import com.sunbeam.entity.HrManager;
import com.sunbeam.entity.User;
import com.sunbeam.entity.Vacancy;
import com.sunbeam.entity.types.Decision;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class HiringServiceImpl implements HiringService {

    private final HiringDao hiringDao;
    private final ApplicationDao applicationDao;
    private final VacancyDao vacancyDao;
    private final HrManagerDao hrManagerDao;
    private final UserDao userDao;

    @Override
    public List<HiringDTO> getAllHirings() {
        List<Hirings> hirings = hiringDao.findAllWithDetails();
        return hirings.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public HiringDTO getHiringById(Long id) {
        Hirings hiring = hiringDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hiring decision not found with ID: " + id));
        return convertToDTO(hiring);
    }

    @Override
    public HiringDTO createHiring(HiringDTO hiringDTO) {
        Hirings hiring = new Hirings();
        
        // Map basic fields with defaults for required fields
        hiring.setInterviewerName(hiringDTO.getInterviewerName() != null ? hiringDTO.getInterviewerName() : "HR Manager");
        hiring.setDecision(hiringDTO.getDecision());
        hiring.setSalaryOffered(hiringDTO.getSalaryOffered() != null ? hiringDTO.getSalaryOffered() : 0L);
        hiring.setStartDate(hiringDTO.getStartDate() != null ? hiringDTO.getStartDate() : java.time.LocalDate.now().plusDays(30));
        hiring.setNotes(hiringDTO.getNotes());
        
        // Set relationships
        if (hiringDTO.getApplicationId() != null) {
            Application application = applicationDao.findById(hiringDTO.getApplicationId())
                    .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + hiringDTO.getApplicationId()));
            hiring.setApplication(application);
            
            // Auto-set vacancy from application if not provided
            if (hiringDTO.getVacancyId() == null && application.getVacancy() != null) {
                hiring.setVacancy(application.getVacancy());
            }
        }
        
        if (hiringDTO.getVacancyId() != null) {
            Vacancy vacancy = vacancyDao.findById(hiringDTO.getVacancyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Vacancy not found with ID: " + hiringDTO.getVacancyId()));
            hiring.setVacancy(vacancy);
        }
        
        if (hiringDTO.getHrManagerId() != null) {
            HrManager hrManager = hrManagerDao.findById(hiringDTO.getHrManagerId())
                    .orElseThrow(() -> new ResourceNotFoundException("HR Manager not found with ID: " + hiringDTO.getHrManagerId()));
            hiring.setHrManager(hrManager);
        }
        
        Hirings savedHiring = hiringDao.save(hiring);
        return convertToDTO(savedHiring);
    }

    @Override
    public HiringDTO createHiringByEmail(HiringDTO hiringDTO, String hrEmail) {
        // Find HR Manager by email
        HrManager hrManager = hrManagerDao.findByUserEmail(hrEmail)
                .orElseThrow(() -> new ResourceNotFoundException("HR Manager not found with email: " + hrEmail));
        
        // Set HR Manager in DTO
        hiringDTO.setHrManagerId(hrManager.getId());
        hiringDTO.setHrManagerName(hrManager.getUser().getFirstName() + " " + hrManager.getUser().getLastName());
        
        // If interviewer name not provided, use HR manager name
        if (hiringDTO.getInterviewerName() == null || hiringDTO.getInterviewerName().trim().isEmpty()) {
            hiringDTO.setInterviewerName(hrManager.getUser().getFirstName() + " " + hrManager.getUser().getLastName());
        }
        
        return createHiring(hiringDTO);
    }

    @Override
    public HiringDTO updateHiring(Long id, HiringDTO hiringDTO) {
        Hirings existingHiring = hiringDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hiring decision not found with ID: " + id));
        
        // Update basic fields
        if (hiringDTO.getInterviewerName() != null) {
            existingHiring.setInterviewerName(hiringDTO.getInterviewerName());
        }
        if (hiringDTO.getDecision() != null) {
            existingHiring.setDecision(hiringDTO.getDecision());
        }
        if (hiringDTO.getSalaryOffered() != null) {
            existingHiring.setSalaryOffered(hiringDTO.getSalaryOffered());
        }
        if (hiringDTO.getStartDate() != null) {
            existingHiring.setStartDate(hiringDTO.getStartDate());
        }
        if (hiringDTO.getNotes() != null) {
            existingHiring.setNotes(hiringDTO.getNotes());
        }
        
        // Update relationships if provided
        if (hiringDTO.getApplicationId() != null) {
            Application application = applicationDao.findById(hiringDTO.getApplicationId())
                    .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + hiringDTO.getApplicationId()));
            existingHiring.setApplication(application);
        }
        
        if (hiringDTO.getVacancyId() != null) {
            Vacancy vacancy = vacancyDao.findById(hiringDTO.getVacancyId())
                    .orElseThrow(() -> new ResourceNotFoundException("Vacancy not found with ID: " + hiringDTO.getVacancyId()));
            existingHiring.setVacancy(vacancy);
        }
        
        if (hiringDTO.getHrManagerId() != null) {
            HrManager hrManager = hrManagerDao.findById(hiringDTO.getHrManagerId())
                    .orElseThrow(() -> new ResourceNotFoundException("HR Manager not found with ID: " + hiringDTO.getHrManagerId()));
            existingHiring.setHrManager(hrManager);
        }
        
        Hirings updatedHiring = hiringDao.save(existingHiring);
        return convertToDTO(updatedHiring);
    }

    @Override
    public ApiResponse deleteHiring(Long id) {
        Hirings hiring = hiringDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Hiring decision not found with ID: " + id));
        
        hiringDao.delete(hiring);
        return new ApiResponse("Hiring decision deleted successfully");
    }

    @Override
    public List<HiringDTO> getHiringsByDecision(Decision decision) {
        List<Hirings> hirings = hiringDao.findByDecisionWithDetails(decision);
        return hirings.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    @Override
    public HiringDTO getHiringByApplication(Long applicationId) {
        List<Hirings> hirings = hiringDao.findByApplicationIdWithDetails(applicationId);
        if (hirings.isEmpty()) {
            throw new ResourceNotFoundException("No hiring decision found for application ID: " + applicationId);
        }
        // Return the first hiring decision (assuming one decision per application)
        return convertToDTO(hirings.get(0));
    }

    private HiringDTO convertToDTO(Hirings hiring) {
        HiringDTO dto = new HiringDTO();
        
        // Map basic fields
        dto.setId(hiring.getId());
        dto.setInterviewerName(hiring.getInterviewerName());
        dto.setDecision(hiring.getDecision());
        dto.setSalaryOffered(hiring.getSalaryOffered());
        dto.setStartDate(hiring.getStartDate());
        dto.setNotes(hiring.getNotes());
        dto.setCreatedAt(hiring.getCreatedAt());
        dto.setDecidedDate(hiring.getCreatedAt());
        
        // Populate flat fields for backward compatibility
        if (hiring.getApplication() != null) {
            dto.setApplicationId(hiring.getApplication().getId());
            if (hiring.getApplication().getUser() != null) {
                User user = hiring.getApplication().getUser();
                dto.setApplicantName(user.getFirstName() + " " + user.getLastName());
                dto.setApplicantEmail(user.getEmail());
            }
            
            // Populate nested Application DTO
            HiringDTO.ApplicationSummaryDTO appSummary = new HiringDTO.ApplicationSummaryDTO();
            appSummary.setId(hiring.getApplication().getId());
            appSummary.setStatus(hiring.getApplication().getStatus().name());
            appSummary.setAppliedDate(hiring.getApplication().getCreatedAt());
            appSummary.setCoverLetter(hiring.getApplication().getCoverLetter());
            
            if (hiring.getApplication().getUser() != null) {
                User user = hiring.getApplication().getUser();
                HiringDTO.ApplicationSummaryDTO.UserSummaryDTO userSummary = new HiringDTO.ApplicationSummaryDTO.UserSummaryDTO();
                userSummary.setId(user.getId());
                userSummary.setFirstName(user.getFirstName());
                userSummary.setLastName(user.getLastName());
                userSummary.setEmail(user.getEmail());
                userSummary.setPhoneNumber(user.getPhoneNumber());
                appSummary.setUser(userSummary);
            }
            dto.setApplication(appSummary);
        }
        
        if (hiring.getVacancy() != null) {
            dto.setVacancyId(hiring.getVacancy().getId());
            dto.setVacancyTitle(hiring.getVacancy().getTitle());
            
            // Populate nested Vacancy DTO
            HiringDTO.VacancySummaryDTO vacancySummary = new HiringDTO.VacancySummaryDTO();
            vacancySummary.setId(hiring.getVacancy().getId());
            vacancySummary.setTitle(hiring.getVacancy().getTitle());
            vacancySummary.setDepartment(hiring.getVacancy().getDepartment());
            vacancySummary.setLocation(hiring.getVacancy().getLocation());
            vacancySummary.setDescription(hiring.getVacancy().getDescription());
            dto.setVacancy(vacancySummary);
        }
        
        if (hiring.getHrManager() != null) {
            dto.setHrManagerId(hiring.getHrManager().getId());
            if (hiring.getHrManager().getUser() != null) {
                User hrUser = hiring.getHrManager().getUser();
                dto.setHrManagerName(hrUser.getFirstName() + " " + hrUser.getLastName());
                
                // Populate nested HR Manager DTO
                HiringDTO.HrManagerSummaryDTO hrSummary = new HiringDTO.HrManagerSummaryDTO();
                hrSummary.setId(hiring.getHrManager().getId());
                hrSummary.setDepartmentName(hiring.getHrManager().getDepartmentName());
                hrSummary.setFirstName(hrUser.getFirstName());
                hrSummary.setLastName(hrUser.getLastName());
                hrSummary.setEmail(hrUser.getEmail());
                dto.setHrManager(hrSummary);
            }
        }
        
        return dto;
    }
}
