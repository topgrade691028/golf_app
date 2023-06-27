package com.pr.golf.golfapp.mapper;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Component;

import com.pr.golf.golfapp.dto.UserRoleDTO;
import com.pr.golf.golfapp.model.UserRole;

@Component
public class UserRoleMapper {

	public UserRoleDTO toDto(UserRole userRole) {
		UserRoleDTO userRoleDTO = UserRoleDTO.builder().id(userRole.getId()).role(userRole.getRole()).build();
		return userRoleDTO;
	}

	public List<UserRoleDTO> toDto(List<UserRole> entities) {
		List<UserRoleDTO> userRoleDTOs = new ArrayList<>(entities.size());
		for (UserRole entity : entities) {
			userRoleDTOs.add(toDto(entity));
		}
		return userRoleDTOs;
	}

	public List<UserRole> toEntity(List<UserRoleDTO> userRoleDTOs) {
		List<UserRole> userRoleEntities = new ArrayList<>();

		if (userRoleDTOs != null) {
			userRoleEntities = userRoleDTOs.stream()
					.map(userRole -> UserRole.builder().id(userRole != null ? userRole.getId() : null)
							.role(userRole != null ? userRole.getRole() : null).build())
					.collect(Collectors.toList());
		}

		return userRoleEntities;
	}

}
