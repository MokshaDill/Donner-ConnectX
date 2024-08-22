package com.springbootcrud.adminservice.repository;

import com.springbootcrud.adminservice.entity.DonationCamp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DonationCampRepository extends JpaRepository<DonationCamp, Integer> {
    // Custom query methods if needed
}
