package com.springbootcrud.userservice.repository;

import com.springbootcrud.userservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    //JpaRepository provides CRUD methods including save, findAll, findById, deleteById, etc.
}