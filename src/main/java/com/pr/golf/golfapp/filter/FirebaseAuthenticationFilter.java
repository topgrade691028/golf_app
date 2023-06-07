/*
 * package com.pr.golf.golfapp.filter; import
 * com.google.firebase.auth.FirebaseAuth; import
 * jakarta.servlet.http.HttpServletRequest; import
 * jakarta.servlet.http.HttpServletResponse; import
 * org.springframework.security.authentication.AuthenticationManager; import
 * org.springframework.security.authentication.AuthenticationProvider; import
 * org.springframework.security.authentication.BadCredentialsException; import
 * org.springframework.security.authentication.
 * UsernamePasswordAuthenticationToken; import
 * org.springframework.security.core.Authentication; import
 * org.springframework.security.core.AuthenticationException; import
 * org.springframework.security.web.authentication.
 * AbstractAuthenticationProcessingFilter; import
 * org.springframework.security.web.authentication.AuthenticationFailureHandler;
 * import org.springframework.security.web.authentication.preauth.
 * PreAuthenticatedAuthenticationToken;
 * 
 * import java.io.IOException;
 * 
 * public class FirebaseAuthenticationFilter extends
 * AbstractAuthenticationProcessingFilter {
 * 
 * private final FirebaseAuth firebaseAuth;
 * 
 * public FirebaseAuthenticationFilter(FirebaseAuth firebaseAuth) {
 * super("/**"); this.firebaseAuth = firebaseAuth; }
 * 
 * @Override public Authentication attemptAuthentication(HttpServletRequest
 * request, HttpServletResponse response) throws AuthenticationException,
 * IOException { String authorizationHeader =
 * request.getHeader("Authorization"); if (authorizationHeader == null ||
 * !authorizationHeader.startsWith("Bearer ")) { throw new
 * BadCredentialsException("Invalid authorization header"); }
 * 
 * String idToken = authorizationHeader.substring(7); // Remove "Bearer " prefix
 * 
 * try { firebaseAuth.verifyIdToken(idToken); // Validate the ID token with
 * Firebase } catch (Exception e) { throw new
 * BadCredentialsException("Invalid ID token", e); }
 * 
 * // Create an authentication token with the user's ID as the principal
 * Authentication authentication = new
 * PreAuthenticatedAuthenticationToken(idToken, null);
 * 
 * return getAuthenticationManager().authenticate(authentication); }
 * 
 * @Override protected void unsuccessfulAuthentication(HttpServletRequest
 * request, HttpServletResponse response, AuthenticationException failed) throws
 * IOException { response.sendError(HttpServletResponse.SC_UNAUTHORIZED,
 * failed.getMessage()); }
 * 
 * @Override public void setAuthenticationManager(AuthenticationManager
 * authenticationManager) {
 * super.setAuthenticationManager(authenticationManager); } }
 */