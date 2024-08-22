package com.springbootcrud.adminservice.service;

import com.springbootcrud.adminservice.entity.DonationCamp;

import java.util.List;

public interface DonationCampService {
    DonationCamp approveDonationCamp(int id, boolean approved);
    List<DonationCamp> getAllDonationCamps();
}
