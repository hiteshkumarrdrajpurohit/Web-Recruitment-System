package com.sunbeam.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.custom_exceptions.AuthenticationFailureException;
import com.sunbeam.custom_exceptions.InvalidInputException;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.SignInDTO;
import com.sunbeam.dto.SignUpDTO;
import com.sunbeam.dto.UpdateUserDTO;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.entity.User;

import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

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
