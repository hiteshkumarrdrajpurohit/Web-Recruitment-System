package com.sunbeam.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.SignInDTO;
import com.sunbeam.dto.SignUpDTO;
import com.sunbeam.dto.UpdateUserDTO;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.entity.User;
import org.springframework.security.crypto.password.PasswordEncoder;




@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserDao userDao;

    
    @Autowired
    private PasswordEncoder passwordEncoder;
    // Login
    @Override
    public UserDTO signIn(SignInDTO dto) {
        Optional<User> optional = userDao.findByEmailAndPassword(dto.getEmail(), dto.getPassword());
        if (!optional.isPresent()) {
            throw new ResourceNotFoundException("Invalid email or password.");
        }

        User user = optional.get();
        return new UserDTO(
            user.getId(),
            user.getFirstName() + " " + user.getLastName(),
            user.getEmail(),
            user.getRole().toString()
        );
    }

    // Register
    @Override
    public UserDTO signUp(SignUpDTO dto) {
        if (userDao.existsByEmail(dto.getEmail())) {
            throw new RuntimeException("Email is already registered.");
        }

        User user = new User();
        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setEmail(dto.getEmail());
        user.setPassword(dto.getPassword());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setDateOfBirth(dto.getDateOfBirth());
        user.setRole(dto.getRole());

        user.setSkills(dto.getSkills());
        user.setAddress(dto.getAddress());
        user.setCity(dto.getCity());
        user.setState(dto.getState());
        user.setCountry(dto.getCountry());
        user.setZipCode(dto.getZipCode());
        user.setOrgName(dto.getOrgName());
        user.setDesignation(dto.getDesignation());
        user.setStartDate(dto.getStartDate());
        user.setEndDate(dto.getEndDate());
        user.setSummary(dto.getSummary());

        user = userDao.save(user);

        return new UserDTO(
            user.getId(),
            user.getFirstName() + " " + user.getLastName(),
            user.getEmail(),
            user.getRole().toString()
        );
    }

    // Update profile
    @Override
    public ApiResponse updateUser(Long id, UpdateUserDTO dto) {
        User user = userDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        user.setFirstName(dto.getFirstName());
        user.setLastName(dto.getLastName());
        user.setPassword(dto.getPassword());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setSkills(dto.getSkills());
        user.setAddress(dto.getAddress());
        user.setCity(dto.getCity());
        user.setState(dto.getState());
        user.setCountry(dto.getCountry());
        user.setZipCode(dto.getZipCode());
        user.setOrgName(dto.getOrgName());
        user.setDesignation(dto.getDesignation());
        user.setStartDate(dto.getStartDate());
        user.setEndDate(dto.getEndDate());
        user.setSummary(dto.getSummary());

        userDao.save(user);

        return new ApiResponse("User profile updated successfully!");
    }

    // Get user info
    @Override
    public UserDTO getUserById(Long id) {
        User user = userDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        return new UserDTO(
            user.getId(),
            user.getFirstName() + " " + user.getLastName(),
            user.getEmail(),
            user.getRole().toString()
        );
    }

    // Delete user
    @Override
    public ApiResponse deleteUser(Long id) {
        User user = userDao.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + id));

        userDao.delete(user);

        return new ApiResponse("User deleted successfully!");
    }
    
    
    @Override
    public ApiResponse changePassword(Long userId, String oldPassword, String newPassword) {
        User user = userDao.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with ID: " + userId));

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            throw new RuntimeException("Old password is incorrect");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userDao.save(user);

        return new ApiResponse("Password changed successfully");
    }

}
