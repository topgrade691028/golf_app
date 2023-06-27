package com.pr.golf.golfapp.authorize;

import java.util.List;

import org.springframework.stereotype.Component;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;
import com.pr.golf.golfapp.dto.UserRoleDTO;
import com.pr.golf.golfapp.model.User;
import com.pr.golf.golfapp.repository.UserRepository;
import com.pr.golf.golfapp.service.UserRoleService;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class UserRoleAuthorizationChecker {
	
	private final UserRoleService userRoleService;
	private final UserRepository userRepository;

	public UserRoleAuthorizationChecker(UserRoleService userRoleService, UserRepository userRepository) {
		this.userRoleService = userRoleService;
		this.userRepository = userRepository;
	}

	public static boolean test(String authorization) {
		log.info("authorzation header " + authorization);
		return true;
	}
    
    public boolean hasManagerOrAdminRole(String token) {
        // Perform the necessary logic to check the user roles based on the provided idToken
        // You can use the existing code from the getUserRoles() method
        
        // Replace the code below with your actual implementation
    	log.info("Token is " + token);
        
        FirebaseToken decodedToken;
        try {
            decodedToken = FirebaseAuth.getInstance().verifyIdToken(token);
    
            String uid = decodedToken.getUid();
        
            User user = userRepository.findByUsername(uid);
            if (user == null) {
                return false;
            }
    
            List<UserRoleDTO> userRoles = userRoleService.findByUserId(user.getId());
            
            return userRoles.stream()
                    .anyMatch(role -> role.getRole().equals("manager") || role.getRole().equals("admin"));
        } catch (FirebaseAuthException e) {
            return false;
        }
    }
}
