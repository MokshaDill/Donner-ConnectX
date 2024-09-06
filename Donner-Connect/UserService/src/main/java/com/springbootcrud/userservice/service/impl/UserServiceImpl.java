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

    /**
     * Updates the profile of an existing user.
     *
     * @param user The user with updated information
     * @return The updated user
     */

    @Override
    public User updateUser(Long id, User user) {
        Optional<User> existingUser = userRepository.findById(user.getId());
        if (existingUser.isPresent()) {
            User updatedUser = existingUser.get();
            updatedUser.setName(user.getName());
            updatedUser.setEmail(user.getEmail());
            updatedUser.setPhoneNumber(user.getPhoneNumber());
            updatedUser.setDonations(user.getDonations());
            return userRepository.save(updatedUser);
        } else {
            throw new IllegalArgumentException("User not found");
        }
    }

    /**
     * Retrieves a user's profile.
     *
     * @param userId The ID of the user
     * @return The user profile
     */
    @Override
    public User getUserById(Long userId) {
        return userRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("User not found"));
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
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public List<String> getDonationHistory(Long userId) {
        // Dummy implementation for demonstration
        // In real-world use, this would fetch data from a repository or another service.
        return List.of("Donation 1", "Donation 2", "Donation 3");
    }
}