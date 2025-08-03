package com.sunbeam.dao;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.sunbeam.entity.User;

public interface UserDao extends JpaRepository<User, Long> {

	// sign in
	Optional<User> findByEmail(String em);

	//for signUp etc... check 
	boolean existsByEmail(String em);

	Optional<User> findByEmailAndPassword(String email, String password);
	
}
