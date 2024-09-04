package com.springbootcrud.adminservice.controller;

import com.springbootcrud.adminservice.entity.Admin;
import com.springbootcrud.adminservice.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * AdminController handles HTTP requests related to Admin entities.
 */
@RestController
@RequestMapping("/admin")
@CrossOrigin
public class AdminController {

    @Autowired
    private AdminService adminService;

    /**
     * Creates a new Admin.
     * @param admin The admin object to be created.
     * @return The created admin object.
     */
    @PostMapping("/create")
    public Admin createAdmin(@RequestBody Admin admin) {
        // Call the service method to add a new admin
        return adminService.addAdmin(admin);
    }

    /**
     * Retrieves all Admins.
     * @return A list of all admin objects.
     */
    @GetMapping("/all")
    public List<Admin> getAllAdmins() {
        // Call the service method to retrieve all admins
        return adminService.getAllAdmins();
    }

    /**
     * Retrieves an Admin by ID.
     * @param id The ID of the admin to retrieve.
     * @return The retrieved admin object, or a 404 error if not found.
     */
    @GetMapping("/{id}")
    public ResponseEntity<Admin> getAdminById(@PathVariable Long id) {
        // Call the service method to retrieve the admin by ID
        Admin admin = adminService.getAdminById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));
        return ResponseEntity.ok(admin);
    }

    /**
     * Updates an existing Admin.
     * @param id The ID of the admin to update.
     * @param adminDetails The admin object with updated details.
     * @return The updated admin object.
     */
    @PutMapping("/update/{id}")
    public ResponseEntity<Admin> updateAdmin(@PathVariable Long id, @RequestBody Admin adminDetails) {
        // Call the service method to update the admin
        Admin updatedAdmin = adminService.updateAdmin(id, adminDetails);
        return ResponseEntity.ok(updatedAdmin);
    }

    /**
     * Deletes an Admin by ID.
     * @param id The ID of the admin to delete.
     * @return A 204 No Content response if successful.
     */
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Void> deleteAdmin(@PathVariable Long id) {
        // Call the service method to delete the admin by ID
        adminService.deleteAdmin(id);
        return ResponseEntity.noContent().build();
    }
}
