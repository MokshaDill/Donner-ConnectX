package com.springbootcrud.userservice.service;

import java.util.List;
import java.util.Map;

public interface DonationService {

    List<Map<String, Object>> getDonationsByUserId(Long userId);
}

