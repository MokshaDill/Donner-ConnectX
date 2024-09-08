package com.springbootcrud.campmgtservice.service.impl;

import com.springbootcrud.campmgtservice.entity.Camp;
import com.springbootcrud.campmgtservice.repository.CampRepository;
import com.springbootcrud.campmgtservice.service.CampService;
import com.springbootcrud.contributorservice.entity.Contributor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
public class CampServiceImpl implements CampService {

    @Autowired
    private CampRepository campRepository;

    @Autowired
    private RestTemplate restTemplate;  // Inject RestTemplate

    @Override
    public Camp createCamp(Camp camp) {
        // Fetch contributor details from ContributorService
        String contributorUrl = "http://localhost:8085/contributor/{id}";
        Contributor contributor = restTemplate.getForObject(contributorUrl, Contributor.class, camp.getContributorId());

        // now use the contributor details in your logic
        if (contributor != null) {
            // Proceed with creating the camp
            return campRepository.save(camp);
        } else {
            throw new RuntimeException("Contributor not found");
        }
    }

    @Override
    public Camp updateCamp(Long id, Camp campDetails) {
        Camp camp = campRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Camp not found"));
        camp.setName(campDetails.getName());
        camp.setLocation(campDetails.getLocation());
        camp.setDate(campDetails.getDate());
        return campRepository.save(camp);
    }

    @Override
    public Camp getCampById(Long id) {
        return campRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Camp not found"));
    }

    @Override
    public List<Camp> getCampsByContributor(Long contributorId) {
        return campRepository.findByContributorId(contributorId);
    }

    @Override
    public void deleteCamp(Long id) {
        Camp camp = campRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Camp not found"));
        campRepository.delete(camp);
    }

    @Override
    public List<Camp> getAllPendingApprovalCamps() {
        return campRepository.findByApprovedFalse();
    }
}
