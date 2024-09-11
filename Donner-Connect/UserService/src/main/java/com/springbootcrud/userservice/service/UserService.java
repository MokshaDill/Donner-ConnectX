package com.springbootcrud.userservice.Service;

import com.springbootcrud.userservice.entity.User;

import java.util.List;

/**
 * UserService interface defines the methods for CRUD operations on User entities.
 */
public interface UserService {

    /**
     * Registers a new User in the database.
     * @param user The user object to be registered.
     * @return The registered user object.
     */
  
    User registerUser(User user);

    /**
     * Retrieves all Users from the database.
     *
     * @return A list of all user objects.
     */

    List<User> getAllUsers();

    /**
     * Retrieves a User by their ID.
     *
     * @param userId The ID of the user to retrieve.
     * @return An Optional containing the user object if found, or empty if not.
     */
    User getUserById(Long userId);

    /**
     * Updates an existing User's details.
     *
     * @param id The ID of the user to update.
     * @param user The user object with updated details.
     * @return The updated user object.
     */
    User updateUser(Long id, User user);

    /**
     * Deletes a User from the database.
     *
     * @param userId The ID of the user to delete.
     */
    void deleteUser(Long userId);

}