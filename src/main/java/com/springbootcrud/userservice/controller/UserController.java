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

    /**
     * Updates the profile of an existing user.
     *
     * @param user The user with updated information
     * @return The updated user
     */
    @PutMapping("/update")
    public User updateUser(@PathVariable Long id, @RequestBody User user) {
        return userService.updateUser(id, user);
    }

    /**
     * Retrieves the profile of a user by ID.
     *
     * @param userId The ID of the user
     * @return The user profile
     */
    @GetMapping("/{userid}")
    public User getUserById(@PathVariable Long userId) {
        return userService.getUserById(userId);
    }

    /**
     * Deletes a user profile by ID.
     *
     * @param userId The ID of the user
     */
    @DeleteMapping("/{userid}")
    public void deleteUser(@PathVariable Long userId) {
        userService.deleteUser(userId);
    }

    /**
     * Retrieves all users.
     *
     * @return A list of all users
     */
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }


    @GetMapping("/{userId}/donations")
    public List<String> getDonationHistory(@PathVariable Long userId) {
        return userService.getDonationHistory(userId);
    }
}
