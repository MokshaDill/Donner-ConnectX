package com.springbootcrud.adminservice.service.impl;

import com.springbootcrud.adminservice.entity.DonationCamp;
import com.springbootcrud.adminservice.repository.DonationCampRepository;
import com.springbootcrud.adminservice.service.DonationCampService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DonationCampServiceImpl implements DonationCampService {

    @Autowired
    private DonationCampRepository donationCampRepository;

    @Override
    public DonationCamp approveDonationCamp(int id, boolean approved) {
        Optional<DonationCamp> optionalCamp = donationCampRepository.findById(id);
        if (optionalCamp.isPresent()) {
            DonationCamp camp = optionalCamp.get();
            camp.setApproved(approved);
            return donationCampRepository.save(camp);
        }
        throw new RuntimeException("Donation Camp not found");
    }

    @Override
    public List<DonationCamp> getAllDonationCamps() {
        return donationCampRepository.findAll();
    }
}
