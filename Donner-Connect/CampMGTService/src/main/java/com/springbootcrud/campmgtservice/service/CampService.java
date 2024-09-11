package com.springbootcrud.campmgtservice.service;

import com.springbootcrud.campmgtservice.entity.Camp;

import java.util.List;

public interface CampService {
    Camp createCamp(Camp camp);
    Camp updateCamp(Long id, Camp campDetails);
    Camp getCampById(Long id);
    List<Camp> getCampsByContributor(Long contributorId);
    void deleteCamp(Long id);
    List<Camp> getAllPendingApprovalCamps();

    List<Camp> getAllCamps();
}
