package com.sunbeam.dto;

import java.time.LocalDateTime;

import com.sunbeam.entity.types.JobStatus;

public class VacancyHRDTO {
	 private String title;
	    
	    private String department;
	    
	    private String location;
	    
	    private Double minSalary;
	    
	    private Double maxSalary;
	    
	    private JobStatus status;
	    
	    private LocalDateTime applicationDeadLine;

}
