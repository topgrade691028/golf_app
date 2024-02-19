package com.pr.golf.golfapp.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.pr.golf.golfapp.dto.CreateUserRolesRequestBody;
import com.pr.golf.golfapp.dto.UserRoleDTO;
import com.pr.golf.golfapp.model.Role;
import com.pr.golf.golfapp.model.User;
import com.pr.golf.golfapp.model.UserRole;
import com.pr.golf.golfapp.repository.RoleRepository;
import com.pr.golf.golfapp.repository.UserRepository;
import com.pr.golf.golfapp.service.UserRoleService;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.log4j.Log4j;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/users")
@Slf4j
public class UserController {
	private final UserRepository userRepository;
	private final UserRoleService userRoleService;
	private final RoleRepository roleRepository;
	
	public UserController(UserRepository userRepository, UserRoleService userRoleService,
							RoleRepository roleRepository) {
		this.userRepository = userRepository;
		this.userRoleService = userRoleService;
		this.roleRepository = roleRepository;
	}

	@PostMapping("/createRoles")
	public ResponseEntity<Void> createRoles(@RequestBody CreateUserRolesRequestBody requestBody,
			HttpServletRequest request) {

		String authorizationHeader = request.getHeader("Authorization");
		String idToken = authorizationHeader.substring(7); // Remove "Bearer " prefix
		String email;
		String uid;

		FirebaseToken decodedToken;
		try {
			decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);

			email = decodedToken.getEmail();
			uid = decodedToken.getUid();

			User user = userRepository.findByEmail(email);
			if (user == null) {
				user = userRepository.save(User.builder()
										.email(requestBody.getEmail())
										.username(uid)
										.build());
				//return ResponseEntity.notFound().build();
			}

			for (String roleName : requestBody.getRoles()) {
			    // Create a UserRole instance with the user and role entities
			    Role roleEntity = roleRepository.findByName("ROLE_" + roleName.toUpperCase());
			    if (roleEntity == null) {
			        // Handle case where the role does not exist
			        // You may throw an exception or log a warning
			        continue; // Skip to the next role
			    }

			    UserRole userRole = UserRole.builder()
			        .user(user)
			        .role(roleEntity) // Pass the Role entity
			        .build();

			    // Save the user role
			    userRoleService.save(userRole);
			}
		} catch (FirebaseAuthException e) {
			// return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		return ResponseEntity.ok().build();
	}

	@GetMapping("/roles")
	// @PreAuthorize("hasRole('ROLE_USER') and #oauth2.isUser() and
	// #oauth2.isValidToken()")
	public ResponseEntity<List<UserRoleDTO>> getUserRoles(@RequestParam("email") String email,
			HttpServletRequest request) {

		log.info("in roles now");
		String authorizationHeader = request.getHeader("Authorization");
		String idToken = authorizationHeader.substring(7); // Remove "Bearer " prefix

		FirebaseToken decodedToken;
		try {
			decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);

			String uid = decodedToken.getUid();
		
			User user = userRepository.findByUsername(uid);
			if (user == null) {
				return ResponseEntity.notFound().build();
			}

			List<UserRoleDTO> userRoles = userRoleService.findByUserId(user.getId());
			return ResponseEntity.ok(userRoles);

		} catch (FirebaseAuthException e) {
			// return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		return ResponseEntity.status(204).build();
	}

}
