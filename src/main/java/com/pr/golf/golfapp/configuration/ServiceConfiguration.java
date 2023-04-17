package com.pr.golf.golfapp.configuration;

import com.pr.golf.golfapp.service.TableService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

//@Configuration
public class ServiceConfiguration {

    @Bean
    public TableService tableService() {
        return new TableService();
    }
}
