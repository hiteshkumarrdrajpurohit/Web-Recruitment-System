package com.sunbeam.service;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.ChangePasswordDTO;
import com.sunbeam.dto.SignInDTO;
import com.sunbeam.dto.SignUpDTO;
import com.sunbeam.dto.UpdateUserDTO;
import com.sunbeam.dto.UserDTO;

public interface UserService {

	// Login
	UserDTO signIn(SignInDTO dto);

	// Register
	UserDTO signUp(SignUpDTO dto);

	// Update profile
	ApiResponse updateUser(Long id, UpdateUserDTO dto);

	// Get user info for profile/settings display
	UserDTO getUserById(Long id);

	// Optional: Delete user (useful for settings page)
	ApiResponse deleteUser(Long id);
	


	ApiResponse changePassword(Long userId, String oldPassword, String newPassword);



}
