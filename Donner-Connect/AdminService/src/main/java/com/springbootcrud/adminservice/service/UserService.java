package com.springbootcrud.adminservice.service;

import com.springbootcrud.adminservice.entity.User;

import java.util.List;

/**
 * Service interface for managing Users.
 * This interface defines operations for creating, updating, retrieving,
 * and deleting users.
 */
public interface UserService {

    /**
     * Creates a new user.
     *
     * @param user The User object containing the details of the user to be created.
     * @return The created User object.
     */
    User createUser(User user);

    /**
     * Updates an existing user based on the provided id.
     *
     * @param id   The ID of the user to be updated.
     * @param user The User object containing the updated details.
     * @return The updated User object.
     */
    User updateUser(int id, User user);

    /**
     * Deletes a user based on the provided id.
     *
     * @param id The ID of the user to be deleted.
     */
    void deleteUser(int id);

    /**
     * Retrieves a list of all users.
     *
     * @return A list of User objects representing all users.
     */
    List<User> getAllUsers();
}
