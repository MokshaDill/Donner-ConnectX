package com.springbootcrud.contributorservice.repository;

import com.springbootcrud.contributorservice.entity.Contributor;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContributorRepository extends JpaRepository<Contributor, Long> {

}
