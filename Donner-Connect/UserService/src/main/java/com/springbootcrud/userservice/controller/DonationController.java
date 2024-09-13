package com.springbootcrud.userservice.controller;

import com.springbootcrud.userservice.service.DonationService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@CrossOrigin
@RestController
@RequestMapping("/donation")
public class DonationController {

    private final DonationService donationService;

    public DonationController(DonationService donationService) {
        this.donationService = donationService;
    }


    /**
     *
     * @param userId id of the user
     * @return user donation history
     */
    @GetMapping("/{userId}")
    public List<Map<String, Object>> getDonationsByUserId(@PathVariable Long userId) {
        return donationService.getDonationsByUserId(userId);
    }
}
