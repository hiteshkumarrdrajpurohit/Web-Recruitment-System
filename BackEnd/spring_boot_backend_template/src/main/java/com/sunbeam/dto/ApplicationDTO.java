
package com.sunbeam.dto;

import com.sunbeam.entity.types.ApplicationStatus;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class ApplicationDTO {
    private Long id;
    private Long vacancyId;
    private Long userId;
    private Long interviewId;
    private ApplicationStatus status;
    private String coverLetter;
    private String resumeFileName;
    private String resumeFilePath;
}
