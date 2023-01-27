package com.project.varedditbackend.config;

import com.project.varedditbackend.VaredditBackendApplication;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


// Gère des règles + roles users
// On peut définir nos users ici

// WebSecurityConfigurerAdapter deprecated -> https://www.youtube.com/watch?v=s4X4SJv2RrU
// Use SecurityFilterChain or WebSecurityCustomizer

// TODO : Récupérer nos users (Appuser)
@EnableWebSecurity
@Configuration
public class SecurityConfig {
    private static final Logger log = LoggerFactory.getLogger(VaredditBackendApplication.class);

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {
        log.info("configure");

        // TODO : Accept post request on /authenticate
        return http
                .cors().and().csrf().disable()
                .authorizeHttpRequests().anyRequest().permitAll().and().build();
    }

}
