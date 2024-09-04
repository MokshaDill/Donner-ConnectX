package com.springbootcrud.adminservice.service.impl;

import com.springbootcrud.adminservice.entity.Admin;
import com.springbootcrud.adminservice.repository.AdminRepository;
import com.springbootcrud.adminservice.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**
 * Implementation of the AdminService interface to handle CRUD operations on Admin entities.
 */
@Service
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    /**
     * {@inheritDoc}
     */
    @Override
    public Admin addAdmin(Admin admin) {
        // Save the admin entity to the database
        return adminRepository.save(admin);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public List<Admin> getAllAdmins() {
        // Retrieve all admin entities from the database
        return adminRepository.findAll();
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Optional<Admin> getAdminById(Long id) {
        // Find an admin by ID
        return adminRepository.findById(id);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public Admin updateAdmin(Long id, Admin adminDetails) {
        // Retrieve the admin by ID, or throw an exception if not found
        Admin admin = adminRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        // Update admin details
        admin.setEmail(adminDetails.getEmail());
        admin.setName(adminDetails.getName());
        admin.setPassword(adminDetails.getPassword());
        admin.setPhone(adminDetails.getPhone());

        // Save the updated admin entity
        return adminRepository.save(admin);
    }

    /**
     * {@inheritDoc}
     */
    @Override
    public void deleteAdmin(Long id) {
        // Delete the admin entity by ID
        adminRepository.deleteById(id);
    }
}
