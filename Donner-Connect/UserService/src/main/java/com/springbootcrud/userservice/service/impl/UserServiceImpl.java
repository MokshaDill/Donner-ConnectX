package com.springbootcrud.userservice.service.impl;

import com.springbootcrud.userservice.entity.User;
import com.springbootcrud.userservice.repository.UserRepository;
import com.springbootcrud.userservice.service.UserService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    /**
     * Registers a new user as a donor.
     *
     * @param user The user to register
     * @return The registered user
     */
    @Override
    public User registerUser(User user) {
        return userRepository.save(user);
    }
}