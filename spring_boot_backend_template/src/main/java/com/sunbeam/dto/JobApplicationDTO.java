package com.sunbeam.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JobApplicationDTO {
    private Long userId;
    private Long vacancyId;
    private String coverLetter;
    private String resumeFileName;
    private String resumeFilePath;
} 