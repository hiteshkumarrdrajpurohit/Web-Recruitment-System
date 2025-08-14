package com.sunbeam.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserDTO {
	
	private String phoneNumber;
   
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

