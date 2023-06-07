/*
package com.pr.golf.golfapp.filter;
import com.google.firebase.auth.FirebaseAuth;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationFailureHandler;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import java.io.IOException;

public class CustomFirebaseAuthenticationFilter extends UsernamePasswordAuthenticationFilter {

    private final AuthenticationManager authenticationManager;
    private final FirebaseAuth firebaseAuth;

    public CustomFirebaseAuthenticationFilter(AuthenticationManager authenticationManager, FirebaseAuth firebaseAuth) {
        this.authenticationManager = authenticationManager;
        this.firebaseAuth = firebaseAuth;

        setRequiresAuthenticationRequestMatcher(new AntPathRequestMatcher("/login", "POST"));
        setAuthenticationSuccessHandler(new CustomAuthenticationSuccessHandler());
        setAuthenticationFailureHandler(new CustomAuthenticationFailureHandler());
    }

    @Override
    public Authentication attemptAuthentication(HttpServletRequest request, HttpServletResponse response) {
       
    	String authorizationHeader = request.getHeader("Authorization");
        if (authorizationHeader == null || !authorizationHeader.startsWith("Bearer ")) {
            throw new BadCredentialsException("Invalid authorization header");
        }

        String idToken = authorizationHeader.substring(7); // Remove "Bearer " prefix

        try {
            firebaseAuth.verifyIdToken(idToken); // Validate the ID token with Firebase
        } catch (Exception e) {
            throw new BadCredentialsException("Invalid ID token", e);
        }

        // Create an authentication token with the user's ID as the principal
        Authentication authentication = new UsernamePasswordAuthenticationToken(idToken, null);

        return authenticationManager.authenticate(authentication);
    }

    private static class CustomAuthenticationSuccessHandler implements AuthenticationSuccessHandler {
        @Override
        public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                            Authentication authentication) throws IOException, ServletException {
            // Handle successful authentication
            response.setStatus(HttpServletResponse.SC_OK);
        }
    }

    private static class CustomAuthenticationFailureHandler implements AuthenticationFailureHandler {
        @Override
        public void onAuthenticationFailure(HttpServletRequest request, HttpServletResponse response,
                                            org.springframework.security.core.AuthenticationException exception)
                throws IOException, ServletException {
            // Handle failed authentication
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, exception.getMessage());
        }
    }
}
*/
