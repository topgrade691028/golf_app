package com.pr.golf.golfapp.controller;

import java.util.List;

import org.springframework.http.HttpStatus;
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
import com.pr.golf.golfapp.model.CreateUserRolesRequestBody;
import com.pr.golf.golfapp.model.User;
import com.pr.golf.golfapp.model.UserRole;
import com.pr.golf.golfapp.repository.UserRepository;
import com.pr.golf.golfapp.repository.UserRoleRepository;

import jakarta.servlet.http.HttpServletRequest;

@RestController
@RequestMapping("/users")
public class UserController {
	private final UserRepository userRepository;
	private final UserRoleRepository userRoleRepository;

	public UserController(UserRepository userRepository, UserRoleRepository userRoleRepository) {
		this.userRepository = userRepository;
		this.userRoleRepository = userRoleRepository;
	}

	@PostMapping("/createRoles")
	public ResponseEntity<Void> createRoles(@RequestBody CreateUserRolesRequestBody request) {
		User user = userRepository.findByEmail(request.getEmail());
		if (user == null) {
			return ResponseEntity.notFound().build();
		}

		for (String role : request.getRoles()) {
			UserRole userRole = UserRole.builder().id(user.getId()).role(role).build();
			userRoleRepository.save(userRole);
		}

		return ResponseEntity.ok().build();
	}

	@GetMapping("/roles")
	// @PreAuthorize("hasRole('ROLE_USER') and #oauth2.isUser() and
	// #oauth2.isValidToken()")
	public ResponseEntity<List<UserRole>> getUserRoles(@RequestParam("email") String email,
			HttpServletRequest request) {
		String authorizationHeader = request.getHeader("Authorization");
		if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		String idToken = authorizationHeader.substring(7); // Remove "Bearer " prefix

		FirebaseToken decodedToken;
		try {
			decodedToken = FirebaseAuth.getInstance().verifyIdToken(idToken);
		} catch (FirebaseAuthException e) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}

		String uid = decodedToken.getUid();
		User user = userRepository.findByEmail(uid);
		if (user == null) {
			return ResponseEntity.notFound().build();
		}

		List<UserRole> userRoles = userRoleRepository.findByUserId(user.getId());
		return ResponseEntity.ok(userRoles);
	}

}
