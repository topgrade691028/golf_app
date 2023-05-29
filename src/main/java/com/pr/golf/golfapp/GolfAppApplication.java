package com.pr.golf.golfapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import lombok.extern.slf4j.Slf4j;

@SpringBootApplication
@Slf4j
public class GolfAppApplication {

	public static void main(String[] args) {
		log.info("Application starting...");
		SpringApplication.run(GolfAppApplication.class, args);
	}

}