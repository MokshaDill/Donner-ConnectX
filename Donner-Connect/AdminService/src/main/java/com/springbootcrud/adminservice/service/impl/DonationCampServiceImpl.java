package com.springbootcrud.adminservice.service.impl;

import com.springbootcrud.adminservice.entity.DonationCamp;
import com.springbootcrud.adminservice.repository.DonationCampRepository;
import com.springbootcrud.adminservice.service.DonationCampService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DonationCampServiceImpl implements DonationCampService {

    @Autowired
    private DonationCampRepository donationCampRepository;

    @Override
    public DonationCamp approveDonationCamp(int id, boolean approved) {
        DonationCamp camp = donationCampRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Donation camp not found"));
        camp.setApproved(approved);
        return donationCampRepository.save(camp);
    }

    @Override
    public List<DonationCamp> getAllDonationCamps() {
        return donationCampRepository.findAll();
    }

    @Override
    public DonationCamp createDonationCamp(DonationCamp donationCamp) {
        return donationCampRepository.save(donationCamp);
    }

    @Override
    public DonationCamp updateDonationCamp(int id, DonationCamp donationCamp) {
        if (!donationCampRepository.existsById(id)) {
            throw new EntityNotFoundException("Donation camp not found");
        }
        donationCamp.setId(id);
        return donationCampRepository.save(donationCamp);
    }

    @Override
    public void deleteDonationCamp(int id) {
        if (!donationCampRepository.existsById(id)) {
            throw new EntityNotFoundException("Donation camp not found");
        }
        donationCampRepository.deleteById(id);
    }
}
