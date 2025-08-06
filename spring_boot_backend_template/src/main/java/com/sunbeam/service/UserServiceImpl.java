package com.sunbeam.service;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.sunbeam.custom_exceptions.AuthenticationFailureException;
import com.sunbeam.custom_exceptions.InvalidInputException;
import com.sunbeam.custom_exceptions.ResourceNotFoundException;
import com.sunbeam.dao.HrManagerDao;
import com.sunbeam.dao.UserDao;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.SignInDTO;
import com.sunbeam.dto.SignUpDTO;
import com.sunbeam.dto.UpdateUserDTO;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.entity.HrManager;
import com.sunbeam.entity.User;
import com.sunbeam.entity.types.UserRole;

import lombok.AllArgsConstructor;

@Service
@Transactional
@AllArgsConstructor
public class UserServiceImpl implements UserService {

	private final UserDao userDao;
	private final HrManagerDao hrManagerDao;
	
	private final ModelMapper modelMapper;
	
	@Override
	public UserDTO signIn(SignInDTO dto) {
		System.out.println("=== SIGNIN DEBUG START ===");
		System.out.println("SignIn attempt with email: " + dto.getEmail());
		System.out.println("SignIn attempt with password: " + dto.getPassword());
		
		// Check if user exists by email first
		User userByEmail = userDao.findByEmail(dto.getEmail()).orElse(null);
		if (userByEmail == null) {
			System.out.println("❌ User not found with email: " + dto.getEmail());
			System.out.println("=== SIGNIN DEBUG END ===");
			throw new AuthenticationFailureException("Invalid email or Password");
		}
		
		System.out.println("✅ User found: " + userByEmail.getEmail());
		System.out.println("📧 Stored password: " + userByEmail.getPassword());
		System.out.println("🔑 Provided password: " + dto.getPassword());
		System.out.println("🔍 Password match: " + userByEmail.getPassword().equals(dto.getPassword()));
		
		//1. invoke dao's method
		User entity = 
				userDao.findByEmailAndPassword(dto.getEmail(), dto.getPassword())
				.orElseThrow(()-> {
					System.out.println("❌ Password authentication failed");
					System.out.println("=== SIGNIN DEBUG END ===");
					return new AuthenticationFailureException("Invalid email or Password");
				});
		
		System.out.println("✅ SignIn successful for user: " + entity.getEmail());
		System.out.println("=== SIGNIN DEBUG END ===");
		
		// Create UserDTO and set token
		UserDTO userDTO = modelMapper.map(entity, UserDTO.class);
		userDTO.setToken(entity.getId() + "-" + System.currentTimeMillis());
		return userDTO;
		
	}

	@Override
	public UserDTO signUp(SignUpDTO dto) {
		System.out.println("SignUp attempt with email: " + dto.getEmail());
		
		// Validate required fields
		if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
			throw new InvalidInputException("Email is required");
		}
		if (dto.getPassword() == null || dto.getPassword().trim().isEmpty()) {
			throw new InvalidInputException("Password is required");
		}
		if (dto.getFirstName() == null || dto.getFirstName().trim().isEmpty()) {
			throw new InvalidInputException("First name is required");
		}
		if (dto.getLastName() == null || dto.getLastName().trim().isEmpty()) {
			throw new InvalidInputException("Last name is required");
		}
		
		if(userDao.existsByEmail(dto.getEmail())) {
			System.out.println("Email already exists: " + dto.getEmail());
			throw new InvalidInputException("Email already exists");
		}
		
		try {
			// Set default role if not specified
			if (dto.getRole() == null) {
				dto.setRole(UserRole.USER);
			}
			
			User entity = userDao.save(modelMapper.map(dto, User.class));
			System.out.println("User created successfully with ID: " + entity.getId());
		    
			// Create UserDTO and set token
			UserDTO userDTO = modelMapper.map(entity, UserDTO.class);
			userDTO.setToken(entity.getId() + "-" + System.currentTimeMillis());
			return userDTO;
		} catch (Exception e) {
			System.out.println("Error during signup: " + e.getMessage());
			throw new RuntimeException("Failed to create user account: " + e.getMessage());
		}
	}

	@Override
	public UserDTO hrManagerSignUp(SignUpDTO dto) {
		System.out.println("HR Manager SignUp attempt with email: " + dto.getEmail());
		
		// Validate required fields
		if (dto.getEmail() == null || dto.getEmail().trim().isEmpty()) {
			throw new InvalidInputException("Email is required");
		}
		if (dto.getPassword() == null || dto.getPassword().trim().isEmpty()) {
			throw new InvalidInputException("Password is required");
		}
		if (dto.getFirstName() == null || dto.getFirstName().trim().isEmpty()) {
			throw new InvalidInputException("First name is required");
		}
		if (dto.getLastName() == null || dto.getLastName().trim().isEmpty()) {
			throw new InvalidInputException("Last name is required");
		}
		
		if(userDao.existsByEmail(dto.getEmail())) {
			System.out.println("Email already exists: " + dto.getEmail());
			throw new InvalidInputException("Email already exists");
		}
		
		try {
			// Set role to HRMANAGER
			dto.setRole(UserRole.HRMANAGER);
			
			// Create and save the user
			User newUser = modelMapper.map(dto, User.class);
			newUser = userDao.save(newUser);
			System.out.println("HR Manager user created successfully with ID: " + newUser.getId());
			
			// Create HR Manager entity
			HrManager hrManager = new HrManager();
			hrManager.setUser(newUser);
			hrManager.setDepartmentName("Human Resources"); // Default department
			hrManagerDao.save(hrManager);
			System.out.println("HR Manager entity created successfully");
			
			// Map to DTO and set token
			UserDTO userDTO = modelMapper.map(newUser, UserDTO.class);
			userDTO.setToken(newUser.getId() + "-" + System.currentTimeMillis());
			return userDTO;
		} catch (Exception e) {
			System.out.println("Error during HR Manager signup: " + e.getMessage());
			throw new RuntimeException("Failed to create HR Manager account: " + e.getMessage());
		}
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
		entity.setCountry(dto.getCountry());
		entity.setSkills(dto.getSkills());
		entity.setOrgName(dto.getOrgName());
		entity.setStartDate(dto.getStartDate());
		entity.setEndDate(dto.getEndDate());
		entity.setDesignation(dto.getDesignation());
		entity.setSummary(dto.getSummary());
		
		userDao.save(entity);
		
		return new ApiResponse("Updated User details ....");
	}

	@Override
	public User getUserById(Long userId) {
		return userDao.findById(userId)
				.orElseThrow(() -> new ResourceNotFoundException("User not found with id: " + userId));
	}

}
