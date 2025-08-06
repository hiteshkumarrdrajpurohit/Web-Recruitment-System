package com.sunbeam.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.SignInDTO;
import com.sunbeam.dto.SignUpDTO;
import com.sunbeam.dto.UpdateUserDTO;
import com.sunbeam.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = {"http://localhost:5173", "http://localhost:4173", "http://127.0.0.1:5173"}, allowCredentials = "true")
@AllArgsConstructor
public class UserController {
	
	private final UserService userService;
	
	@PostMapping("/signin")
	@Operation(description = "User sign in")
	public ResponseEntity<ApiResponse> userSignIn(@RequestBody SignInDTO dto) {
		try {
			System.out.println("in sign in "+dto);
			Object result = userService.signIn(dto);
			return ResponseEntity.ok(new ApiResponse(true, "User signed in successfully", result));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage(), null));
		}
	}
	
	@PostMapping("/signup")
	@Operation(description = "User sign up")
	public ResponseEntity<ApiResponse> userSignUp(@RequestBody SignUpDTO dto) {
		try {
			Object result = userService.signUp(dto);
			return ResponseEntity.ok(new ApiResponse(true, "User registered successfully", result));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage(), null));
		}
	}
	
	@PostMapping("/hr-signup")
	@Operation(description = "HR Manager sign up")
	public ResponseEntity<ApiResponse> hrManagerSignUp(@RequestBody SignUpDTO dto) {
		try {
			Object result = userService.hrManagerSignUp(dto);
			return ResponseEntity.ok(new ApiResponse(true, "HR Manager registered successfully", result));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage(), null));
		}
	}
	
	@PutMapping("/profile/{id}")
	@Operation(description = "Update user profile")
	public ResponseEntity<ApiResponse> updateUser(@PathVariable Long id, @RequestBody UpdateUserDTO dto) {
		try {
			Object result = userService.updateUser(id, dto);
			return ResponseEntity.ok(new ApiResponse(true, "Profile updated successfully", result));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage(), null));
		}
	}
	
	@GetMapping("/profile/{id}")
	@Operation(description = "Get user profile by ID")
	public ResponseEntity<ApiResponse> getUserById(@PathVariable Long id) {
		try {
			Object result = userService.getUserById(id);
			return ResponseEntity.ok(new ApiResponse(true, "User profile retrieved successfully", result));
		} catch (Exception e) {
			return ResponseEntity.badRequest().body(new ApiResponse(false, e.getMessage(), null));
		}
	}
}
                                                                                           