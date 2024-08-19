package com.springbootcrud.campmgtservice.repository;

import com.springbootcrud.campmgtservice.entity.Camp;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CampRepository extends JpaRepository<Camp, Long> {
    List<Camp> findByContributorId(Long contributorId);

    List<Camp> findByApprovedFalse();
}
