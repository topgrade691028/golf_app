package com.pr.golf.golfapp.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebSecurity implements WebMvcConfigurer {
 
    public void addCorsMappings(CorsRegistry reg) {
        reg.addMapping("/**").allowedOrigins("*");
    }
	
    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/{path:[^\\.]+}/**")
                .setViewName("forward:/index.html");
    }
 
}

