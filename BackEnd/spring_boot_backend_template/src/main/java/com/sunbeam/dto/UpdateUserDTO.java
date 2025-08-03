package com.sunbeam.dto;

import java.time.LocalDate;

public class UpdateUserDTO {
	@Getter
	@Setter

	private String email;
    
    private String password;
    
    private String firstName;
    
    private String lastName;
    
    private String phoneNumber;
     
    private LocalDate dateOfBirth;
    
    private String address;

	private  String city;
	    
	private String State;
 
	private String Country;
	     
	private Long ZipCode;

    private String orgName;

	private String Designation;
	
    private LocalDate startDate;
	  	   
    private LocalDate endDate;
   
    private String summary;

	}

