package com.sunbeam.dto;

import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

import com.sunbeam.entity.types.JobStatus;
import com.sunbeam.entity.types.JobType;
import jakarta.validation.constraints.NotNull;

@Getter
@Setter
public class VacancyDTO {
    @NotNull
	private String title;
	@NotNull
    private String description;
    @NotNull
    private String department;
    @NotNull
    private String location;
    @NotNull
    private JobType employementType;
    @NotNull
    private Double minSalary;
    @NotNull
    private Double maxSalary;
    @NotNull
    private String responsibilities;
    @NotNull
    private JobStatus status;
    @NotNull
    private LocalDateTime applicationDeadLine;
    @NotNull
    private String requiredEducation;
    @NotNull
    private String requiredExperience;
    @NotNull
    private int numberOfVacancies;
    @NotNull
    private String shiftDetails;
}
