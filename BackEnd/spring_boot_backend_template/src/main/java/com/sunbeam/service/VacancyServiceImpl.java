package com.sunbeam.service;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.dao.UserDao;
import com.sunbeam.dao.VacancyDao;
import com.sunbeam.dto.VacancyDTO;
import com.sunbeam.dto.VacancyHRDTO;
import com.sunbeam.entity.types.JobStatus;
import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor	
public class VacancyServiceImpl implements VacancyService{
	
	private VacancyDao vacancydao;
	private final ModelMapper modelMapper;
	@Override
	public List<VacancyDTO> getAllAvailableVacancies() {
		return vacancydao.findByStatus(JobStatus.ACTIVE)// List<Entity>
				.stream() // Stream<Entity>
				.map(entity -> modelMapper.map(entity, VacancyDTO.class)) // Stream<DTO>
				.toList();
	}

	@Override
	public List<VacancyHRDTO> getAllAvailableVacanciesForHr() {
		return vacancydao.findByStatus(JobStatus.ACTIVE)// List<Entity>
				.stream() // Stream<Entity>
				.map(entity -> modelMapper.map(entity, VacancyHRDTO.class)) // Stream<DTO>
				.toList();
	}
	   @Override
	    public List<VacancyDTO> searchVacancies(String keyword) {
	        return vacancydao.searchByKeyword(keyword)
	                .stream()
	                .map(entity -> modelMapper.map(entity, VacancyDTO.class))
	                .toList();
	    }

}