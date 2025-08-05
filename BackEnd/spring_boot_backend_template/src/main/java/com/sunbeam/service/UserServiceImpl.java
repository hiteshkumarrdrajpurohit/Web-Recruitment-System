package com.sunbeam.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

import org.modelmapper.ModelMapper;

import org.springframework.stereotype.Service;

import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.SignInDTO;
import com.sunbeam.dto.SignUpDTO;
import com.sunbeam.dto.UpdateUserDTO;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.dto.VacancyDTO;
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

	private final UserDao userDao;
	
	private final ModelMapper modelMapper;
	
	@Override
	public UserDTO signIn(SignInDTO dto) {
		// TODO Auto-generated method stub
		
		//1. invoke dao's method
		
		User entity = 
				userDao.findByEmailAndPassword(dto.getEmail(), dto.getPassword())
				.orElseThrow(()-> new AuthenticationFailureException("Invalid email or Password") );
		
		return modelMapper.map(entity, UserDTO.class);
		
	}

	@Override
	public UserDTO signUp(SignUpDTO dto) {
		// TODO Auto-generated method stub
		if(userDao.existsByEmail( dto.getEmail())) {
		 
			throw new InvalidInputException("Email Already Exist");
		}
		
		User entity = userDao.save(modelMapper.map(dto, User.class));
		
	    
		return modelMapper.map(entity, UserDTO.class);
	}

	@Override
	public ApiResponse updateUser(Long id, UpdateUserDTO dto) {
		//get the user by ID
		User entity =userDao.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("Invalid User ID!!!!"));
		entity.setPhoneNumber(dto.getPhoneNumber());
		entity.setAddress(dto.getAddress());
		entity.setCity(dto.getCity());
		entity.setState(dto.getState());
		entity.setZipCode(dto.getZipCode());
		entity.setZipCode(dto.getZipCode());
		entity.setCountry(dto.getCountry());
		entity.setSkills(dto.getSkills());
		entity.setOrgName(dto.getOrgName());
		entity.setStartDate(dto.getStartDate());
		entity.setEndDate(dto.getEndDate());
		entity.setDesignation(dto.getDesignation());
		entity.setSummary(dto.getSummary());
		modelMapper.map(dto, entity);
		
		return new ApiResponse("Updated User details ....");
	}


}
