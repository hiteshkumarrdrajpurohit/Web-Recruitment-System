package com.sunbeam.entity;


import java.time.LocalDate;

import com.sunbeam.entity.types.Decision;

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
@Table(name = "hirings")
@NoArgsConstructor
@Getter
@Setter
@ToString(callSuper = true)

public class Hirings extends BaseEntity {
	
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "application_id", nullable = false)
    private Application application;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "vacancy_id", nullable = false)
    private Vacancy vacancy;

    @Column(nullable=false)
    private String interviewerName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Decision decision;  // SELECTED, REJECTED, HOLD

    @Column(nullable=false)
    private Long salaryOffered;

    @Column(nullable=false)
    private LocalDate startDate;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "decidedBy", nullable = false)
    private HrManager hrManager;

    @Column(columnDefinition = "TEXT")
    private String notes;

   
}