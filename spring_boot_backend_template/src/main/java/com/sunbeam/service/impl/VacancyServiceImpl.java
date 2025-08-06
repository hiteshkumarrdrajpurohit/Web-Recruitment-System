package com.sunbeam.service.impl;

import java.util.List;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;

import com.sunbeam.entity.Vacancy;
import com.sunbeam.entity.HrManager;
import com.sunbeam.repository.VacancyRepository;
import com.sunbeam.repository.HrManagerRepository;
import com.sunbeam.service.VacancyService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class VacancyServiceImpl implements VacancyService {

    private final VacancyRepository vacancyRepository;

    @Autowired
    private HrManagerRepository hrManagerRepository; // You need this repository

    @Override
    public Vacancy createVacancy(Vacancy vacancy, Long hrManagerId) {
        HrManager hrManager = hrManagerRepository.findById(hrManagerId)
            .orElseThrow(() -> new IllegalArgumentException("Invalid HR Manager ID"));
        vacancy.setHrManager(hrManager);
        if (vacancy.getApplicationDeadline() == null) {
            throw new IllegalArgumentException("Application deadline is required");
        }
        validateVacancy(vacancy);
        return vacancyRepository.save(vacancy);
    }

    @Override
    public List<Vacancy> getAllVacancies(String searchTerm, int page, int size, String sortBy) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sortBy));
        if (searchTerm != null && !searchTerm.trim().isEmpty()) {
            return vacancyRepository.findByTitleContainingIgnoreCaseOrDescriptionContainingIgnoreCase(
                searchTerm, searchTerm, pageRequest);
        }
        return vacancyRepository.findAll(pageRequest).getContent();
    }

    @Override
    public List<Vacancy> getActiveJobListings(String searchTerm, String location, String jobType, int page, int size, String sortBy) {
        PageRequest pageRequest = PageRequest.of(page, size, Sort.by(sortBy));
        return vacancyRepository.findActiveVacancies(searchTerm, location, jobType, pageRequest);
    }

    @Override
    public Vacancy getVacancyById(Long vacancyId) {
        return vacancyRepository.findById(vacancyId)
            .orElse(null);
    }



    @Override
    public Vacancy updateVacancy(Long id, Vacancy vacancy) {
        Vacancy existingVacancy = getVacancyById(id);
        validateVacancy(vacancy);
        
        // Update fields
        existingVacancy.setTitle(vacancy.getTitle());
        existingVacancy.setDescription(vacancy.getDescription());
        existingVacancy.setLocation(vacancy.getLocation());
        existingVacancy.setDepartment(vacancy.getDepartment());
        existingVacancy.setEmployementType(vacancy.getEmployementType());
        existingVacancy.setMinSalary(vacancy.getMinSalary());
        existingVacancy.setMaxSalary(vacancy.getMaxSalary());
        existingVacancy.setJobDescription(vacancy.getJobDescription());
        existingVacancy.setReponsibilites(vacancy.getReponsibilites());
        existingVacancy.setStatus(vacancy.getStatus());
        existingVacancy.setApplicationDeadline(vacancy.getApplicationDeadline());
        existingVacancy.setRequiredEducation(vacancy.getRequiredEducation());
        existingVacancy.setRequiredExperience(vacancy.getRequiredExperience());
        existingVacancy.setNumberOfVacencies(vacancy.getNumberOfVacencies());
        existingVacancy.setShiftDetails(vacancy.getShiftDetails());
        
        return vacancyRepository.save(existingVacancy);
    }

    @Override
    public boolean deleteVacancy(Long id) {
        if (!vacancyRepository.existsById(id)) {
            return false;
        }
        vacancyRepository.deleteById(id);
        return true;
    }

    private void validateVacancy(Vacancy vacancy) {
        if (vacancy.getTitle() == null || vacancy.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Vacancy title cannot be empty");
        }
        if (vacancy.getDescription() == null || vacancy.getDescription().trim().isEmpty()) {
            throw new IllegalArgumentException("Vacancy description cannot be empty");
        }
        if (vacancy.getDepartment() == null || vacancy.getDepartment().trim().isEmpty()) {
            throw new IllegalArgumentException("Department cannot be empty");
        }
        if (vacancy.getLocation() == null || vacancy.getLocation().trim().isEmpty()) {
            throw new IllegalArgumentException("Location cannot be empty");
        }
        if (vacancy.getMinSalary() == null || vacancy.getMinSalary() <= 0) {
            throw new IllegalArgumentException("Minimum salary must be greater than 0");
        }
        if (vacancy.getMaxSalary() == null || vacancy.getMaxSalary() <= 0) {
            throw new IllegalArgumentException("Maximum salary must be greater than 0");
        }
        if (vacancy.getMinSalary() > vacancy.getMaxSalary()) {
            throw new IllegalArgumentException("Minimum salary cannot be greater than maximum salary");
        }
        if (vacancy.getApplicationDeadline() == null) {
            throw new IllegalArgumentException("Application deadline cannot be empty");
        }
        if (vacancy.getRequiredEducation() == null || vacancy.getRequiredEducation().trim().isEmpty()) {
            throw new IllegalArgumentException("Required education cannot be empty");
        }
        if (vacancy.getRequiredExperience() == null || vacancy.getRequiredExperience().trim().isEmpty()) {
            throw new IllegalArgumentException("Required experience cannot be empty");
        }
        if (vacancy.getNumberOfVacencies() == null || vacancy.getNumberOfVacencies() <= 0) {
            throw new IllegalArgumentException("Number of vacancies must be greater than 0");
        }
        if (vacancy.getShiftDetails() == null || vacancy.getShiftDetails().trim().isEmpty()) {
            throw new IllegalArgumentException("Shift details cannot be empty");
        }
        if (vacancy.getStatus() == null) {
            throw new IllegalArgumentException("Status cannot be empty");
        }
    }
}
