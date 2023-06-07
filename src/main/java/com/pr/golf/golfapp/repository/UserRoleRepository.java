package com.pr.golf.golfapp.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pr.golf.golfapp.model.UserRole;

public interface UserRoleRepository extends JpaRepository<UserRole, Long> {
	  List<UserRole> findByUserId(Long userId);
	}