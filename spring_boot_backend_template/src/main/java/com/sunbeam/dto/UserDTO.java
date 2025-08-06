package com.sunbeam.dto;

import java.time.LocalDate;

import com.sunbeam.entity.types.UserRole;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserDTO {
	private Long id;
	private String email;
	private String firstName;
	private String lastName;
	private String phoneNumber;
	private UserRole role;
	private LocalDate dateOfBirth;
	private String address;
	private String token;
	private String city;
	private String state;
	private String country;
	private Long zipCode;
	private String skills;
	private String orgName;
	private String designation;
	private LocalDate startDate;
	private LocalDate endDate;
	private String summary;
	private Boolean isActive;
}
