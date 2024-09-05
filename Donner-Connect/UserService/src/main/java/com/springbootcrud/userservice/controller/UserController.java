package com.springbootcrud.userservice.controller;

import com.springbootcrud.userservice.entity.User;
import com.springbootcrud.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserService userService;

    /**
     * Registers a new user as a donor.
     *
     * @param user The user to register
     * @return The registered user
     */
    @PostMapping("/register")
    public User registerUser(@RequestBody User user) {
        return userService.registerUser(user);
    }

}