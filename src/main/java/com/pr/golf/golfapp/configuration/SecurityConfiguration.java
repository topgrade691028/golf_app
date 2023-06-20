package com.pr.golf.golfapp.configuration;

import java.util.Arrays;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.ProviderManager;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.google.firebase.auth.FirebaseAuth;
import com.pr.golf.golfapp.authentication.provider.PreAuthenticatedAuthenticationProvider;
import com.pr.golf.golfapp.authentication.provider.UsernamePasswordAuthenticationProvider;
import com.pr.golf.golfapp.filter.CustomAuthenticationFilter;
import com.pr.golf.golfapp.filter.CustomAuthenticationProvider;

import jakarta.servlet.http.HttpServletResponse;

@Configuration
@EnableWebSecurity
public class SecurityConfiguration {

    private final FirebaseAuth firebaseAuth;
    private final CustomAuthenticationProvider customAuthenticationProvider;

    @Autowired
    public SecurityConfiguration(FirebaseAuth firebaseAuth, CustomAuthenticationProvider customAuthenticationProvider) {
        this.firebaseAuth = firebaseAuth;
        this.customAuthenticationProvider = customAuthenticationProvider;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
        .cors().and() // Enable CORS configuration
        .csrf().disable()
            .sessionManagement()
                .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
            .authorizeHttpRequests()
                .requestMatchers(HttpMethod.GET, "/health", "/public/**").permitAll()
                .requestMatchers("/api/**", "/events/**").authenticated()
                .anyRequest().permitAll()
                .and()
            .addFilterBefore(customAuthenticationFilter(), UsernamePasswordAuthenticationFilter.class)
            .exceptionHandling()
                .authenticationEntryPoint((request, response, authException) ->
                    response.sendError(HttpServletResponse.SC_UNAUTHORIZED));

        return http.build();
    }

    @Bean
    public CustomAuthenticationFilter customAuthenticationFilter() throws Exception {
        CustomAuthenticationFilter filter = new CustomAuthenticationFilter(authenticationManager(), firebaseAuth);
        return filter;
    }

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
    	/**
    	 * @TODO rename these.
    	 */
        PreAuthenticatedAuthenticationProvider preAuthProvider = new PreAuthenticatedAuthenticationProvider(firebaseAuth);
        UsernamePasswordAuthenticationProvider usernamePasswordAuthProvider = new UsernamePasswordAuthenticationProvider(firebaseAuth);

        ProviderManager providerManager = new ProviderManager(Arrays.asList(preAuthProvider, usernamePasswordAuthProvider));
        return providerManager;
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Collections.singletonList("*")); // Set the allowed origin patterns
        configuration.addAllowedHeader("*"); // Set the allowed headers or specify the necessary ones
        configuration.addAllowedMethod("*"); // Set the allowed HTTP methods or specify the necessary ones
        configuration.setAllowCredentials(true); // Set whether the browser should include credentials (e.g., cookies) in CORS requests

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration); // Apply the CORS configuration to all paths

        return source;
    }


}
