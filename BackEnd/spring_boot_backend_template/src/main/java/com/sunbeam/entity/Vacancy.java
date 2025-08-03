package com.sunbeam.entity;

import java.time.LocalDate;

import com.sunbeam.entity.types.JobStatus;
import com.sunbeam.entity.types.JobType;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Entity
@Table(name = "vacancies")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)

public class Vacancy  extends BaseEntity {
      
    @Column(nullable = false)
    private String title;
    
    @Column(columnDefinition = "TEXT")
    private String description;
    
    @Column(nullable = false)
    private String department;
    
    @Column(nullable = false)
    private String location;
    
    @Enumerated(EnumType.STRING)
    private JobType employementType; // FULL_TIME, PART_TIME, CONTRACT, INTERNSHIP
    
    @Column(nullable = false)
    private Long salaryMin;
    
    @Column(nullable = false)
    private Long salaryMax;
    
    @Column(columnDefinition = "TEXT")
    private String jobDescription;
    
    @Column(columnDefinition = "TEXT")
    private String reponsibilites;
    
    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private JobStatus status; // DRAFT, ACTIVE, CLOSED, CANCELLED
    
    @Column(nullable = false)
    private LocalDate applicationDeadline;

    @Column(nullable = false)
    private String requiredEducation;

    @Column(nullable = false)
    private String requiredExperience;

    @Column(nullable = false)
    private Long numberOfVacencies;
   
    @Column(nullable = false)
    private String shift_details;
 
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "created_by", nullable = false)
    private HrManager hrManager; 

}
