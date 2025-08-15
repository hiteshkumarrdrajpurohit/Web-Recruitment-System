package com.sunbeam.service;

import java.util.List;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.HiringDTO;
import com.sunbeam.entity.types.Decision;

public interface HiringService {
    
    List<HiringDTO> getAllHirings();
    HiringDTO getHiringById(Long id);
    HiringDTO createHiring(HiringDTO hiringDTO);
    HiringDTO createHiringByEmail(HiringDTO hiringDTO, String hrEmail);
    HiringDTO updateHiring(Long id, HiringDTO hiringDTO);
    ApiResponse deleteHiring(Long id);
    List<HiringDTO> getHiringsByDecision(Decision decision);
    HiringDTO getHiringByApplication(Long applicationId);
}
