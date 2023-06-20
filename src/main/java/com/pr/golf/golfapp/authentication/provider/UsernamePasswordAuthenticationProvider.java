package com.pr.golf.golfapp.authentication.provider;

import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;

import com.google.firebase.auth.FirebaseAuth;

public class UsernamePasswordAuthenticationProvider implements AuthenticationProvider {

    private final FirebaseAuth firebaseAuth;

    public UsernamePasswordAuthenticationProvider(FirebaseAuth firebaseAuth) {
        this.firebaseAuth = firebaseAuth;
    }

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        // Perform authentication logic specific to UsernamePasswordAuthenticationToken
        UsernamePasswordAuthenticationToken token = (UsernamePasswordAuthenticationToken) authentication;
        // Example code: Validate the credentials against Firebase authentication
        // You should customize this part based on your authentication requirements
        if (validateCredentials(token)) {
            return new UsernamePasswordAuthenticationToken(token.getPrincipal(), token.getCredentials());
        } else {
            throw new BadCredentialsException("Invalid username or password");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return UsernamePasswordAuthenticationToken.class.isAssignableFrom(authentication);
    }

    private boolean validateCredentials(UsernamePasswordAuthenticationToken token) {
        // Perform your credentials validation logic here (e.g., validate against Firebase authentication)
        // Return true if the credentials are valid, false otherwise
        // You should customize this part based on your authentication requirements
        // Example code:
        String username = (String) token.getPrincipal();
        String password = (String) token.getCredentials();
        // Use the username and password to validate against Firebase authentication
        // Return true if the credentials are valid, false otherwise
        return false;
    }
}
