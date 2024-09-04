package com.springbootcrud.adminservice.repository;

import com.springbootcrud.adminservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
    // Custom query methods if needed
}
