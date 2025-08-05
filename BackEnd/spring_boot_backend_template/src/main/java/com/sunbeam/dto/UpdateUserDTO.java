package com.sunbeam.dto;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateUserDTO {

    // Newly added fields to fix the error
    private String firstName;

    private String lastName;

    private String password;

    private String phoneNumber;

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
