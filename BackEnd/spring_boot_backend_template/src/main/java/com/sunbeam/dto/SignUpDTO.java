package com.sunbeam.dto;

import java.time.LocalDate;

import com.sunbeam.entity.types.UserRole;

import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignUpDTO {

	    private String email;
	    
	    private String password;
	    
	    private String firstName;
	    
	    private String lastName;
	    
	    private String phoneNumber;
	    
	    private UserRole role;    // ADMIN, HR_MANAGER, RECRUITER, CANDIDATE
	     
	    private LocalDate dateOfBirth;
	   
}
