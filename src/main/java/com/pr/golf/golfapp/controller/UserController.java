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
import com.pr.golf.golfapp.model.User;
import com.pr.golf.golfapp.model.UserRole;
import com.pr.golf.golfapp.repository.UserRepository;
import com.pr.golf.golfapp.service.UserRoleService;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/users")
public class UserController {
	private final UserRepository userRepository;
	private final UserRoleService userRoleService;

	public UserController(UserRepository userRepository, UserRoleService userRoleService) {
		this.userRepository = userRepository;
		this.userRoleService = userRoleService;
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

			for (String role : requestBody.getRoles()) {
			    UserRole userRole = UserRole.builder()
			        .user(user) // Set the User instance
			        .role("ROLE_" + role.toUpperCase())
			        .build();
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
