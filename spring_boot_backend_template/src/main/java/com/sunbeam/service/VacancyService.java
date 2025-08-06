package com.sunbeam.service;

import java.util.List;

import com.sunbeam.entity.Vacancy;

public interface VacancyService {
	
    List<Vacancy> getAllVacancies(String searchTerm, int page, int size, String sortBy);
    
    List<Vacancy> getActiveJobListings(String searchTerm, String location, String jobType, int page, int size, String sortBy);
    
    Vacancy getVacancyById(Long vacancyId);
    
    Vacancy createVacancy(Vacancy vacancy, Long hrManagerId);
	
	Vacancy updateVacancy(Long vacancyId, Vacancy vacancy);
	
	boolean deleteVacancy(Long vacancyId);
}
