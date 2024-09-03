package com.springbootcrud.authenticationservice.services.impl;

import com.springbootcrud.authenticationservice.model.AuthenticationResponse;
import com.springbootcrud.authenticationservice.model.User;
import com.springbootcrud.authenticationservice.repository.UserRepository;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthenticationService {

    private final UserRepository repository;
    private final PasswordEncoder encoder;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;


    public AuthenticationService(UserRepository repository, PasswordEncoder encoder, JwtService jwtService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.encoder = encoder;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
    }

    public AuthenticationResponse register(User request) {
        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole(request.getRole());

        user = repository.save(user);

        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }

    public AuthenticationResponse authenticate(User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        User user =repository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token);
    }
}
