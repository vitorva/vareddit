package com.project.varedditbackend.controllers;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import org.springframework.beans.factory.annotation.Value;

import org.springframework.http.HttpCookie;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;


@RestController
@RequestMapping("/authenticate")
class AuthenticationController {
    @Value("${com.project.varedditbackend.jwtToken.accessToken}")
    private String accessTokenName;

    @Value("${com.project.varedditbackend.jwtToken.duration}")
    private String duration;


    @PostMapping("")
    public ResponseEntity<?> createAuthenticationToken(){ // @RequestBody AuthenticationRequest authenticationRequest
        return generateResponseEntity("toto");
    }

    /**
     * generates a response entity with the username passed in parameter
     * @param username the username of the user which will be connected
     * @return the response entity generated
     */
    private ResponseEntity<?> generateResponseEntity(String username){
        Algorithm algorithm = Algorithm.HMAC256("secret".getBytes());
        String access_token = JWT.create()
                .withSubject(username)
                .withExpiresAt(new Date(System.currentTimeMillis() + 10 * 60 * 1000))
                .sign(algorithm);



        // store jwt into a http cookie to avoid cookie theft by XSS attack
        HttpCookie cookie = ResponseCookie.from(accessTokenName, access_token)
                .maxAge(Integer.parseInt(duration))
                .httpOnly(true)
                .path("/")
                .build();

        HttpHeaders responseHeaders = new HttpHeaders();

        responseHeaders.add(HttpHeaders.SET_COOKIE, cookie.toString());

        return ResponseEntity.ok().headers(responseHeaders).body("TODO");
    }
}
