package com.springbootcrud.campmgtservice.service.impl;

import com.springbootcrud.campmgtservice.entity.Camp;
import com.springbootcrud.campmgtservice.entity.CampApproval;
import com.springbootcrud.campmgtservice.repository.CampApprovalRepository;
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
    private CampApprovalRepository campApprovalRepository;

    @Autowired
    private RestTemplate restTemplate;  // Inject RestTemplate

    /**
     * Creates a new blood camp and synchronizes it with CampApproval.
     *
     * @param camp The Camp object containing details of the blood camp to be created.
     * @return The created Camp object.
     * @throws RuntimeException if the contributor is not found.
     */

    @Override
    public Camp createCamp(Camp camp) {
        // Fetch contributor details from ContributorService
        String contributorUrl = "http://localhost:8085/contributor/{id}";
        Contributor contributor = restTemplate.getForObject(contributorUrl, Contributor.class, camp.getContributorId());

        if (contributor == null) {
            throw new RuntimeException("Contributor not found");
        }

        // Save the camp
        Camp savedCamp = campRepository.save(camp);

        // Synchronize with CampApproval
        CampApproval campApproval = new CampApproval(
                savedCamp.getName(),
                savedCamp.getLocation(),
                savedCamp.getDate(),
                savedCamp.getTime(),
                savedCamp.isApproved(),
                savedCamp.getContributorId()
        );
        campApprovalRepository.save(campApproval);

        return savedCamp;
    }

    @Override
    public Camp updateCamp(Long id, Camp campDetails) {
        Camp existingCamp = campRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Camp not found"));

        existingCamp.setName(campDetails.getName());
        existingCamp.setLocation(campDetails.getLocation());
        existingCamp.setDate(campDetails.getDate());
        existingCamp.setTime(campDetails.getTime());
        existingCamp.setApproved(campDetails.isApproved());
        existingCamp.setContributorId(campDetails.getContributorId());

        Camp updatedCamp = campRepository.save(existingCamp);

        // Synchronize with CampApproval
        CampApproval campApproval = campApprovalRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("CampApproval not found"));

        campApproval.setName(updatedCamp.getName());
        campApproval.setLocation(updatedCamp.getLocation());
        campApproval.setDate(updatedCamp.getDate());
        campApproval.setTime(updatedCamp.getTime());
        campApproval.setApproved(updatedCamp.isApproved());
        campApproval.setContributorId(updatedCamp.getContributorId());

        campApprovalRepository.save(campApproval);

        return updatedCamp;
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

        // Also delete from CampApproval
        campApprovalRepository.deleteById(id);
    }

    @Override
    public List<Camp> getAllPendingApprovalCamps() {
        return campRepository.findByApprovedFalse();
    }

    @Override
    public List<Camp> getAllCamps() {
        return campRepository.findAll();
    }
}
