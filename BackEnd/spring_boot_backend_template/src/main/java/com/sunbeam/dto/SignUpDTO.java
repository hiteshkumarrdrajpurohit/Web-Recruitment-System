package com.sunbeam.dto;

import java.time.LocalDate;

import com.sunbeam.entity.types.UserRole;

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

    private UserRole role; // ADMIN, HR_MANAGER, RECRUITER, CANDIDATE

    private LocalDate dateOfBirth;

    // Additional fields
    private String skills;

    private String address;

    private String city;

    private String state;

    private String country;

    private Long zipCode;

    private String orgName;

    private String designation;

    private LocalDate startDate;

    private LocalDate endDate;

    private String summary;
}
