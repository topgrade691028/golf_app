/*
 * package com.pr.golf.golfapp.filter;
 * 
 * import org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.security.authentication.AuthenticationProvider; import
 * org.springframework.security.authentication.BadCredentialsException; import
 * org.springframework.security.core.Authentication; import
 * org.springframework.security.core.AuthenticationException; import
 * org.springframework.security.web.authentication.preauth.
 * PreAuthenticatedAuthenticationToken;
 * 
 * import com.google.firebase.auth.FirebaseAuth;
 * 
 * public class CustomAuthenticationProvider implements AuthenticationProvider {
 * 
 * private FirebaseAuth firebaseAuth;
 * 
 * public CustomAuthenticationProvider(@Autowired FirebaseAuth firebaseAuth) {
 * this.firebaseAuth = firebaseAuth; }
 * 
 * @Override public Authentication authenticate(Authentication authentication)
 * throws AuthenticationException { String idToken = (String)
 * authentication.getPrincipal();
 * 
 * try { firebaseAuth.verifyIdToken(idToken); // Validate the ID token with
 * Firebase } catch (Exception e) { throw new
 * BadCredentialsException("Invalid ID token", e); }
 * 
 * // Create an authenticated token with the user's ID as the principal
 * Authentication authenticatedToken = new
 * PreAuthenticatedAuthenticationToken(idToken, null);
 * authenticatedToken.setAuthenticated(true);
 * 
 * return authenticatedToken; }
 * 
 * @Override public boolean supports(Class<?> authentication) { return
 * PreAuthenticatedAuthenticationToken.class.isAssignableFrom(authentication); }
 * }
 */