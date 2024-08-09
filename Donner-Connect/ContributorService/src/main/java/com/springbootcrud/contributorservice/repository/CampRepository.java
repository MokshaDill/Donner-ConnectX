package com.springbootcrud.contributorservice.repository;


import com.springbootcrud.contributorservice.entity.Camp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * Repository interface for Camp entity.
 * Extends JpaRepository to provide CRUD operations.
 */
@Repository
public interface CampRepository extends JpaRepository<Camp, Long> {
}

