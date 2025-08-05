package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.VacancyDTO;
import com.sunbeam.entity.types.JobStatus;

public interface VacancyService {
	
	
	List<VacancyDTO> getAllAvailableVacancies();
	List<VacancyDTO> searchVacancies(String keyword);
}
