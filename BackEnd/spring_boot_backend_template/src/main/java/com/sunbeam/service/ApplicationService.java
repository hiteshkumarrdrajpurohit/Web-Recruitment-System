package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ApplicationDTO;

public interface ApplicationService {
    ApplicationDTO createApplication(ApplicationDTO dto);
    List<ApplicationDTO> getAllApplications();
    ApplicationDTO getApplicationById(Long id);
    List<ApplicationDTO> getApplicationsByUserId(Long userId);
    void deleteApplication(Long id);
}
