package com.sunbeam.entity;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.sunbeam.entity.types.UserRole;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name="users")

@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)

public class User  extends BaseEntity {
   
    
    @Column(unique = true, nullable = false)
    private String email;
    
    @Column(nullable = false)
    private String password;
    
    @Column(nullable = false)
    private String firstName;
    
    @Column(nullable = false)
    private String lastName;
    
    @Column(nullable = false)
    private String phoneNumber;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private UserRole role;    // ADMIN, HR_MANAGER, RECRUITER, CANDIDATE
    
    @Column(nullable = false)
    private String skills;

    @Column(nullable = false)
    private LocalDate dateOfBirth;
    
    @Column(nullable = false)
    private String address;

    @Column(nullable = false)
    private  String city;

    @Column(nullable = false)
    private String State;

    @Column(nullable = false)
    private String Country;
    
    @Column(nullable = false)
    private Long ZipCode;

    @Column(nullable = false)
    private String orgName;

    @Column(nullable = false)
    private String Designation;

   @Column(nullable = false)
    private LocalDate startDate;
  
   @Column(nullable = false)
    private LocalDate endDate;

    @Column(nullable = false)
    private String summary;

    @Column(nullable = false)
    private Boolean isActive = true;

   @OneToMany(mappedBy = "user", 
			cascade = CascadeType.ALL, orphanRemoval = true)

   private List<Application> ApplicationList = new ArrayList<>();

   @OneToMany(mappedBy = "user", 
			cascade = CascadeType.ALL, orphanRemoval = true)

   private List<Interview> interviewList = new ArrayList<>();

   @OneToOne(mappedBy = "user", 
			cascade = CascadeType.ALL, orphanRemoval = true)
    private HrManager hrManger;

}