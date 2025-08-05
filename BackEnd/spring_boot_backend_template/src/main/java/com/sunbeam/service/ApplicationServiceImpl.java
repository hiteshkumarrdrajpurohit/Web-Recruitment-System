package com.sunbeam.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.sunbeam.dao.ApplicationDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.ApplicationDTO;
import com.sunbeam.entity.Application;
import com.sunbeam.entity.User;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationServiceImpl implements ApplicationService {

    private final ApplicationDao applicationDao;
    private final UserDao userDao;
    private final ModelMapper modelMapper;

    @Override
    public ApplicationDTO createApplication(ApplicationDTO dto) {
        Application app = modelMapper.map(dto, Application.class);
        Application saved = applicationDao.save(app);
        return modelMapper.map(saved, ApplicationDTO.class);
    }

    @Override
    public List<ApplicationDTO> getAllApplications() {
        return applicationDao.findAll()
            .stream()
            .map(app -> modelMapper.map(app, ApplicationDTO.class))
            .collect(Collectors.toList());
    }

    @Override
    public ApplicationDTO getApplicationById(Long id) {
        Application app = applicationDao.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Application not found with ID: " + id));
        return modelMapper.map(app, ApplicationDTO.class);
    }

    @Override
    public List<ApplicationDTO> getApplicationsByUserId(Long userId) {
        User user = userDao.findById(userId)
            .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));
        List<Application> apps = applicationDao.findByUser(user);
        return apps.stream()
            .map(app -> modelMapper.map(app, ApplicationDTO.class))
            .collect(Collectors.toList());
    }

    @Override
    public void deleteApplication(Long id) {
        if (!applicationDao.existsById(id)) {
            throw new ResourceNotFoundException("Application not found with ID: " + id);
        }
        applicationDao.deleteById(id);
    }
}
