package com.springbootcrud.adminservice.service;

import com.springbootcrud.adminservice.entity.Admin;

import java.util.List;
import java.util.Optional;

/**
 * AdminService interface defines the methods for CRUD operations on Admin entities.
 */
public interface AdminService {

    /**
     * Adds a new Admin to the database.
     * @param admin The admin object to be added.
     * @return The added admin object.
     */
    Admin addAdmin(Admin admin);

    /**
     * Retrieves all Admins from the database.
     * @return A list of all admin objects.
     */
    List<Admin> getAllAdmins();

    /**
     * Retrieves an Admin by their ID.
     * @param id The ID of the admin to retrieve.
     * @return An Optional containing the admin object if found, or empty if not.
     */
    Optional<Admin> getAdminById(Long id);

    /**
     * Updates an existing Admin's details.
     * @param id The ID of the admin to update.
     * @param admin The admin object with updated details.
     * @return The updated admin object.
     */
    Admin updateAdmin(Long id, Admin admin);

    /**
     * Deletes an Admin from the database.
     * @param id The ID of the admin to delete.
     */
    void deleteAdmin(Long id);
}
