/*
 * package com.pr.golf.golfapp.configuration;
 * 
 * import java.util.Collections;
 * 
 * import org.springframework.beans.factory.annotation.Autowired; import
 * org.springframework.context.annotation.Bean; import
 * org.springframework.context.annotation.Configuration; import
 * org.springframework.security.authentication.AuthenticationManager; import
 * org.springframework.security.authentication.AuthenticationProvider; import
 * org.springframework.security.authentication.ProviderManager; import
 * org.springframework.security.config.annotation.web.builders.HttpSecurity;
 * import org.springframework.security.config.annotation.web.configurers.
 * ExpressionUrlAuthorizationConfigurer; import
 * org.springframework.security.config.http.SessionCreationPolicy; import
 * org.springframework.security.web.SecurityFilterChain; import
 * org.springframework.security.web.context.SecurityContextPersistenceFilter;
 * 
 * import com.google.firebase.auth.FirebaseAuth; import
 * com.pr.golf.golfapp.filter.CustomAuthenticationProvider; import
 * com.pr.golf.golfapp.filter.CustomFirebaseAuthenticationFilter;
 * 
 * //@Configuration public class SecurityConfiguration {
 * 
 * @Bean public AuthenticationManager authenticationManager(FirebaseAuth
 * firebaseAuth) throws Exception { // Configure and return your custom
 * AuthenticationManager here return new
 * ProviderManager(Collections.singletonList(customAuthenticationProvider(
 * firebaseAuth))); }
 * 
 * @Bean public AuthenticationProvider customAuthenticationProvider(FirebaseAuth
 * firebaseAuth) { // Create and configure your custom AuthenticationProvider
 * here return new CustomAuthenticationProvider(firebaseAuth); }
 * 
 * 
 * @Bean public SecurityFilterChain filterChain(HttpSecurity http, @Autowired
 * FirebaseAuth firebaseAuth) throws Exception { return http
 * .authorizeRequests(this::configureAuthorization)
 * .sessionManagement(sessionManagement ->
 * sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
 * .addFilterBefore(new
 * CustomFirebaseAuthenticationFilter(authenticationManager(firebaseAuth),
 * firebaseAuth), SecurityContextPersistenceFilter.class) .build(); }
 * 
 * private void
 * configureAuthorization(ExpressionUrlAuthorizationConfigurer<HttpSecurity>.
 * ExpressionInterceptUrlRegistry authorizeRequests) { // Configure URL-based
 * authorization rules here authorizeRequests.anyRequest().permitAll(); } }
 */