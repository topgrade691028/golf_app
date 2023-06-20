package com.pr.golf.golfapp.authentication.provider;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;

import com.google.firebase.auth.FirebaseAuth;

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
            return new PreAuthenticatedAuthenticationToken(token.getPrincipal(), token.getCredentials());
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
}
