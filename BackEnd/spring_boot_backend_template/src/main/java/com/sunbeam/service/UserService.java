package com.sunbeam.service;
import java.util.List;
import com.sunbeam.dto.ApiResponse;
import com.sunbeam.dto.SignInDTO;
import com.sunbeam.dto.SignUpDTO;
import com.sunbeam.dto.UpdateUserDTO;
import com.sunbeam.dto.UserDTO;
import com.sunbeam.dto.VacancyDTO;

public interface UserService {

	UserDTO signIn(SignInDTO dto);
	UserDTO signUp(SignUpDTO dto);
	ApiResponse updateUser(Long id,UpdateUserDTO dto);
	
}

