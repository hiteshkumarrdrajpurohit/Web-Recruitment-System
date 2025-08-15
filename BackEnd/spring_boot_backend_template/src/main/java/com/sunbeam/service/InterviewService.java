package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.InterviewDTO;
import com.sunbeam.entity.types.InterviewStatus;

public interface InterviewService {
    
    List<InterviewDTO> getAllInterviews();
    InterviewDTO getInterviewById(Long id);
    InterviewDTO createInterview(InterviewDTO interviewDTO);
    InterviewDTO createInterviewByEmail(InterviewDTO interviewDTO, String hrManagerEmail);
    InterviewDTO updateInterview(Long id, InterviewDTO interviewDTO);
    ApiResponse deleteInterview(Long id);
    List<InterviewDTO> getInterviewsByStatus(InterviewStatus status);
    List<InterviewDTO> getInterviewsByApplication(Long applicationId);
}
