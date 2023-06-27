package com.pr.golf.golfapp.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pr.golf.golfapp.dto.UserRoleDTO;
import com.pr.golf.golfapp.mapper.UserRoleMapper;
import com.pr.golf.golfapp.model.UserRole;
import com.pr.golf.golfapp.repository.UserRoleRepository;

@Service
public class UserRoleService {

	private UserRoleRepository userRoleRepository;
	
	private UserRoleMapper userRoleMapper;

	public UserRoleService(@Autowired UserRoleRepository userRoleRepository,
							@Autowired UserRoleMapper userRoleMapper) {
		this.userRoleRepository = userRoleRepository;
		this.userRoleMapper = userRoleMapper;
	}

	public List<UserRole> saveAll(List<UserRole> userRoles) {
		return userRoleRepository.saveAll(userRoles);
	}

	public List<UserRole> update(List<UserRole> userRoles) {
		return userRoleRepository.saveAll(userRoles);
	}

	public Optional<UserRole> findById(Long id) {
		return userRoleRepository.findById(id);
	}
	

	public Optional<List<UserRoleDTO>> getAllUserRoles() {
		// TODO Auto-generated method stub
		return  Optional.of(userRoleMapper.toDto(userRoleRepository.findAll()));
	}

	public void save(UserRole userRole) {
		// TODO Auto-generated method stub
		userRoleRepository.save(userRole);
	}

	public List<UserRoleDTO> findByUserId(Long id) {
		// TODO Auto-generated method stub
		return userRoleMapper.toDto(userRoleRepository.findByUserId(id));
	}

}
