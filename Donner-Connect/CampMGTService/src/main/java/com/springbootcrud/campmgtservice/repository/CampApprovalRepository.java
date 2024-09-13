package com.springbootcrud.campmgtservice.repository;

import com.springbootcrud.campmgtservice.entity.CampApproval;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CampApprovalRepository extends JpaRepository<CampApproval, Long> {
}
