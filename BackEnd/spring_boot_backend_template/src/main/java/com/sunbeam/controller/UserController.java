package com.sunbeam.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.SignInDTO;
import com.sunbeam.dto.SignUpDTO;
import com.sunbeam.dto.UpdateUserDTO;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class UserController {

	private final UserService userService;

	// Login
	@PostMapping("/signin")
	@Operation(summary = "User Sign In", description = "Sign in with email and password")
	public ResponseEntity<UserDTO> userSignIn(@RequestBody SignInDTO dto) {
		System.out.println("in sign in: " + dto);
		UserDTO user = userService.signIn(dto);
		return ResponseEntity.ok(user);
	}

	// Register
	@PostMapping("/signup")
	@Operation(summary = "User Sign Up", description = "Register a new user")
	public ResponseEntity<UserDTO> userSignUp(@RequestBody SignUpDTO dto) {
		System.out.println("in sign up: " + dto);
		UserDTO user = userService.signUp(dto);
		return ResponseEntity.ok(user);
	}

	// Update profile
	@PutMapping("/{userId}")
	@Operation(summary = "Update User Profile", description = "Update user profile by ID")
	public ResponseEntity<ApiResponse> updateUser(@PathVariable Long userId, @RequestBody UpdateUserDTO dto) {
		System.out.println("in update: userId = " + userId);
		ApiResponse response = userService.updateUser(userId, dto);
		return ResponseEntity.ok(response);
	}

	// Get user by ID
	@GetMapping("/{userId}")
	@Operation(summary = "Get User", description = "Fetch user by ID")
	public ResponseEntity<UserDTO> getUserById(@PathVariable Long userId) {
		UserDTO user = userService.getUserById(userId);
		return ResponseEntity.ok(user);
	}

	// Delete user
	@DeleteMapping("/{userId}")
	@Operation(summary = "Delete User", description = "Delete user by ID")
	public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long userId) {
		ApiResponse response = userService.deleteUser(userId);
		return ResponseEntity.ok(response);
	}
	
	
	// Change Password
	@PutMapping("/{userId}/change-password")
	@Operation(summary = "Change Password", description = "Change password for a user")
	public ResponseEntity<ApiResponse> changePassword(@PathVariable Long userId,
	                                                  @RequestParam String oldPassword,
	                                                  @RequestParam String newPassword) {
	    ApiResponse response = userService.changePassword(userId, oldPassword, newPassword);
	    return ResponseEntity.ok(response);
	}

	// Logout (stateless token-based logout)
	@PostMapping("/logout")
	@Operation(summary = "Logout", description = "Logs out the current user")
	public ResponseEntity<ApiResponse> logout() {
	    ApiResponse response = new ApiResponse("User logged out successfully");
	    return ResponseEntity.ok(response);
	}

}
