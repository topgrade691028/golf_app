package com.pr.golf.golfapp.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pr.golf.golfapp.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
	  User findByEmail(String email);
	  
	  User findByUsername(String userName);
	}
