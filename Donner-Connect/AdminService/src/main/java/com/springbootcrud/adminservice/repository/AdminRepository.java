package com.springbootcrud.adminservice.repository;

import com.springbootcrud.adminservice.entity.Admin;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdminRepository extends JpaRepository<Admin, Long> {
    // JpaRepository provides CRUD methods including save, findAll, findById, deleteById, etc.
}
