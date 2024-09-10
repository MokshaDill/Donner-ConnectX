package com.springbootcrud.authenticationservice.services;

import com.springbootcrud.authenticationservice.entity.AuthenticationResponse;
import com.springbootcrud.authenticationservice.entity.User;
import org.springframework.stereotype.Service;

@Service
public interface AuthenticationService {

    /**
     * register
     * @param request
     * @return
     */
    AuthenticationResponse register(User request);

    /**
     *
     * @param request
     * @return
     */
    AuthenticationResponse authenticate(User request);

}
