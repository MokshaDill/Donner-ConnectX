package com.springbootcrud.userservice.service.impl;

import com.springbootcrud.userservice.entity.User;
import com.springbootcrud.userservice.repository.UserRepository;
import com.springbootcrud.userservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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

    /**
     * Updates the profile of an existing user.
     *
     * @param user The user with updated information
     * @return The updated user
     */

    @Override
    public User updateUser(Long id, @org.jetbrains.annotations.NotNull User user) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));

        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPhoneNumber(user.getPhoneNumber());
        existingUser.setAddress(user.getAddress());

        return userRepository.save(existingUser);
    }

    /**
     * Retrieves a user's profile.
     *
     * @param userId The ID of the user
     * @return The user profile
     */

    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("User not found"));
    }

    /**
     * Deletes a user's profile.
     *
     * @param userId The ID of the user
     */
    public void deleteUser(Long userId) {
        userRepository.deleteById(userId);
    }

    /**
     * Retrieves all users.
     *
     * @return A list of all users
     */

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

}