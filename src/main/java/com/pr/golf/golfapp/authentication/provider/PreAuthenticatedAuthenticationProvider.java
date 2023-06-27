package com.pr.golf.golfapp.authentication.provider;

import java.util.ArrayList;
import java.util.List;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;

import com.google.firebase.auth.FirebaseAuth;
import com.google.firebase.auth.FirebaseAuthException;
import com.google.firebase.auth.FirebaseToken;

public class PreAuthenticatedAuthenticationProvider implements AuthenticationProvider {

    private final FirebaseAuth firebaseAuth;

    public PreAuthenticatedAuthenticationProvider(FirebaseAuth firebaseAuth) {
        this.firebaseAuth = firebaseAuth;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        // Perform authentication logic specific to PreAuthenticatedAuthenticationToken
        PreAuthenticatedAuthenticationToken token = (PreAuthenticatedAuthenticationToken) authentication;
        // Example code: Validate the token against Firebase authentication
        // You should customize this part based on your authentication requirements
        if (validateToken(token)) {
            String uid = extractUidFromToken(token);

            // Get user roles based on the UID (Replace with your actual implementation)
            List<String> userRoles = getUserRoles(uid);

            // Create a list of GrantedAuthority objects based on the user roles
            List<GrantedAuthority> authorities = new ArrayList<>();
            for (String role : userRoles) {
                authorities.add(new SimpleGrantedAuthority(role));
            }

            // Create a new authenticated token with the user's authorities
            PreAuthenticatedAuthenticationToken authenticatedToken = new PreAuthenticatedAuthenticationToken(
                    token.getPrincipal(),
                    token.getCredentials(),
                    authorities
            );

            return authenticatedToken;
           // return new PreAuthenticatedAuthenticationToken(token.getPrincipal(), token.getCredentials());
        } else {
            throw new BadCredentialsException("Invalid pre-authenticated token");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return PreAuthenticatedAuthenticationToken.class.isAssignableFrom(authentication);
    }

    private boolean validateToken(PreAuthenticatedAuthenticationToken token) {
        // Perform your token validation logic here (e.g., validate against Firebase authentication)
        // Return true if the token is valid, false otherwise
        // You should customize this part based on your authentication requirements
        // Example code:
        String preAuthToken = (String) token.getPrincipal();
        // Use the preAuthToken to validate against Firebase authentication
        // Return true if the token is valid, false otherwise
    	try {
			firebaseAuth.verifyIdToken(preAuthToken); // Validate the ID token with
			
		} catch (Exception e) {
			throw new BadCredentialsException("Invalid ID token", e);
		}

        return true;
    }
    
    private String extractUidFromToken(PreAuthenticatedAuthenticationToken token) {
        // Extract the user's UID from the token
        // Replace with your actual implementation based on the token structure
        // Example code:
        String preAuthToken = (String) token.getPrincipal();
        FirebaseToken decodedToken;
		try {
			decodedToken = firebaseAuth.verifyIdToken(preAuthToken);
			return decodedToken.getUid();
		} catch (FirebaseAuthException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		  return "";
    }
    
    private List<String> getUserRoles(String uid) {
        // Get the user's roles based on the UID
        // Replace with your actual implementation
        // Example code:
        List<String> roles = new ArrayList<>();
        // Query the database or user management system to retrieve the roles based on the UID
        // Add the roles to the 'roles' list
        roles.add("ROLE_ADMIN");
        roles.add("ROLE_MANAGER");
        return roles;
    }
}
