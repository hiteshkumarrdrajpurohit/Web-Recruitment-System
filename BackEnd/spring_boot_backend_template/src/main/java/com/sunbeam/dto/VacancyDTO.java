package com.sunbeam.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

import com.sunbeam.entity.types.JobStatus;
import com.sunbeam.entity.types.JobType;

@Getter
@Setter
public class VacancyDTO {
	private String title;
	
    private String description;
    
    private String department;
    
    private String location;
    
    private JobType employementType;
    
    private Double minSalary;
    
    private Double maxSalary;
    
    private String responsibilities;
    
    private JobStatus status;
    
    private LocalDateTime applicationDeadLine;
    
    private String requiredEducation;
    
    private String requiredExperience;
    
    private int numberOfVacancies;
    
    private String shiftDetails;
}
