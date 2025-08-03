package com.sunbeam.dto;

import java.time.LocalDate;
import lombok.Getter;
import lombok.Setter;

public class UpdateUserDTO {
	@Getter
	@Setter
   
    private String skills;
    
    private String address;

	private  String city;
	    
	private String State;
 
	private Long ZipCode;
	
	private String Country;

    private String orgName;

	private String Designation;
	
    private LocalDate startDate;
	  	   
    private LocalDate endDate;
   
    private String summary;

	}

