package com.sunbeam.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.VacancyDTO;
import com.sunbeam.service.UserService;
import com.sunbeam.service.VacancyService;
import com.sunbeam.service.VacancyServiceImpl;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/vacancies")
@AllArgsConstructor
public class VacancyController {
	private final VacancyService vacancyService;
	@GetMapping
	public ResponseEntity<?> getAllAvailableRestaurants() {
		System.out.println("in get all");
		List<VacancyDTO> restaurants = 
				vacancyService.getAllAvailableVacancies();
		if (restaurants.isEmpty())
			return ResponseEntity.status(HttpStatus.NO_CONTENT)// 204
					.build();
		//  non empty list
		return ResponseEntity.ok(restaurants);// SC 200 , list
	}
	
	   @GetMapping("/search")
	    public ResponseEntity<?> searchVacancies(@RequestParam String keyword) {
	        List<VacancyDTO> vacancies = vacancyService.searchVacancies(keyword);
	        if (vacancies.isEmpty())
	            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
	        return ResponseEntity.ok(vacancies);
	    }
}
