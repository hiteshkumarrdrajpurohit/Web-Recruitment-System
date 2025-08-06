package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.VacancyDTO;
import com.sunbeam.dto.VacancyHRDTO;
import com.sunbeam.entity.types.JobStatus;

public interface VacancyService {
	
	
	List<VacancyDTO> getAllAvailableVacancies();

	List<VacancyHRDTO> getAllAvailableVacanciesForHr();

	List<VacancyDTO> searchVacancies(String keyword);
	
	ApiResponse updateVacancy(Long id,VacancyHRDTO dto);
	
	ApiResponse deleteVacancy(Long id);
}

