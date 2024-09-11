package com.springbootcrud.authenticationservice.services.impl;

import com.springbootcrud.authenticationservice.entity.AuthenticationResponse;
import com.springbootcrud.authenticationservice.entity.User;
import com.springbootcrud.authenticationservice.repository.UserRepository;
import com.springbootcrud.authenticationservice.services.AuthenticationService;
import com.springbootcrud.authenticationservice.services.JwtService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationServiceImpl implements AuthenticationService {

    @Autowired
    private final UserRepository repository;
    @Autowired
    private final PasswordEncoder encoder;
    @Autowired
    private final JwtService jwtService;
    @Autowired
    private final PasswordEncoder passwordEncoder;
    @Autowired
    private final AuthenticationManager authenticationManager;

    public AuthenticationServiceImpl(UserRepository repository, PasswordEncoder encoder, JwtService jwtService, PasswordEncoder passwordEncoder, AuthenticationManager authenticationManager) {
    this.repository = repository;
    this.encoder = encoder;
    this.jwtService = jwtService;
    this.passwordEncoder = passwordEncoder;
    this.authenticationManager = authenticationManager;
    }

    /**
     * to register user
     * @param request
     * @return
     */
    public AuthenticationResponse register(User request) {
        User user = new User();

        user.setFirstName(request.getFirstName());
        user.setLastName(request.getLastName());
        user.setUsername(request.getUsername());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        user.setRole(request.getRole());

        user = repository.save(user);

        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token,user.getId());
    }

    /**
     * to authenticate user
     * @param request
     * @return
     */
    public AuthenticationResponse authenticate(User request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );
        User user =repository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.generateToken(user);

        return new AuthenticationResponse(token,user.getId());
    }
}
