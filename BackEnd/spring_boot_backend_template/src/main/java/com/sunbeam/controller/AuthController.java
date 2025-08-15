package com.sunbeam.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;

import com.sunbeam.dto.SignInDTO;
import com.sunbeam.dto.SignUpDTO;
import com.sunbeam.dto.UpdateUserDTO;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.service.UserService;
import lombok.AllArgsConstructor;
import com.sunbeam.security.JwtUtil;

@RestController
@RequestMapping("/users")
@AllArgsConstructor
public class AuthController {
    
    private UserService userService;
    
    @Autowired
	private AuthenticationManager authManager;
	@Autowired
	private JwtUtil jwtUtil;
    @Autowired
	PasswordEncoder pwen;

    @PostMapping("/signin")
    public ResponseEntity<?> signIn(@RequestBody SignInDTO signInCredential) {
        try {
            // authenticate user with authentication manager		
            Authentication auth = new UsernamePasswordAuthenticationToken(signInCredential.getEmail(), signInCredential.getPassword());
            auth = authManager.authenticate(auth);

            // after authentication, create JWT token and return. 
            String token = jwtUtil.createToken(auth);

            return ResponseEntity.ok(token);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid email or password");
        }
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpDTO signUpCredential) {
        return ResponseEntity.ok(userService.signUp(signUpCredential));
    }

    /**
     * Get user profile
     * @param authentication - Current user authentication
     * @return User profile data
     */
    @GetMapping("/profile")
    @PreAuthorize("hasRole('USER') or hasRole('HRMANAGER')")
    public ResponseEntity<UserDTO> getProfile(Authentication authentication) {
        String email = authentication.getName();
        UserDTO user = userService.getUserByEmail(email);
        return ResponseEntity.ok(user);
    }

    /**
     * Update user profile
     * @param updateUserDTO - Updated user data
     * @param authentication - Current user authentication
     * @return Success response
     */
    @PutMapping("/profile")
    @PreAuthorize("hasRole('USER') or hasRole('HRMANAGER')")
    public ResponseEntity<ApiResponse> updateProfile(@RequestBody UpdateUserDTO updateUserDTO, Authentication authentication) {
        String email = authentication.getName();
        UserDTO currentUser = userService.getUserByEmail(email);
        ApiResponse response = userService.updateUser(currentUser.getId(), updateUserDTO);
        return ResponseEntity.ok(response);
    }

    /**
     * Get all candidates (users with USER role) - for HR
     * @return List of all candidates
     */
    @GetMapping("/candidates")
    @PreAuthorize("hasRole('HRMANAGER')")
    public ResponseEntity<List<UserDTO>> getAllCandidates() {
        List<UserDTO> candidates = userService.getAllCandidates();
        return ResponseEntity.ok(candidates);
    }

}
