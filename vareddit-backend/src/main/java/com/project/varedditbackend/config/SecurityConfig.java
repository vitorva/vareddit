package com.project.varedditbackend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;


// Gère des règles + roles users
// On peut définir nos users ici

// WebSecurityConfigurerAdapter deprecated -> https://www.youtube.com/watch?v=s4X4SJv2RrU
// Use SecurityFilterChain or WebSecurityCustomizer

// TODO : Récupérer nos users (Appuser)
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain configure(HttpSecurity http) throws Exception {

        return http
                .csrf().disable()
                .authorizeHttpRequests().and().build();
    }
}
