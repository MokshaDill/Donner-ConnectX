package com.springbootcrud.authenticationservice.repository;

import com.springbootcrud.authenticationservice.entity.Contributor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

@org.springframework.stereotype.Repository
public interface ContributorRepository extends JpaRepository<Contributor, Integer> {

    @Query(value = "SELECT id FROM contributor WHERE email = ?1 AND password = ?2", nativeQuery = true)
    int getUserByEmailAndPassword(String email, String password);
}
