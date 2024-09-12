package com.springbootcrud.adminservice.service;

import com.springbootcrud.adminservice.entity.DonationCamp;

import java.util.List;

public interface DonationCampService {
    DonationCamp approveDonationCamp(int id, boolean approved);
    List<DonationCamp> getAllDonationCamps();
    DonationCamp createDonationCamp(DonationCamp donationCamp);
    DonationCamp updateDonationCamp(int id, DonationCamp donationCamp);
    void deleteDonationCamp(int id);
}
