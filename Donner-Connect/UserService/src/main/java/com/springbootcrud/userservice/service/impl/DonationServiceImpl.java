package com.springbootcrud.userservice.service.impl;

import com.springbootcrud.userservice.repository.DonationRepository;
import com.springbootcrud.userservice.service.DonationService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;

@Service
public class DonationServiceImpl implements DonationService {

    private final DonationRepository donationRepository;

    /**
     *
     * @param donationRepository donation data
     */
    public DonationServiceImpl(DonationRepository donationRepository) {
        this.donationRepository = donationRepository;
    }

    /**
     *
     * @param userId the id of user
     * @return donation data
     */
    @Override
    public List<Map<String, Object>> getDonationsByUserId(Long userId) {
        return donationRepository.findDonationsByUserId(userId);
    }
}

