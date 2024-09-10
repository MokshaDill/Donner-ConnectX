package com.springbootcrud.authenticationservice.repository;

import com.springbootcrud.authenticationservice.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Integer> {

    /**
     *
     * @param username
     * @return
     */
    Optional<User> findByUsername(String username);


}




