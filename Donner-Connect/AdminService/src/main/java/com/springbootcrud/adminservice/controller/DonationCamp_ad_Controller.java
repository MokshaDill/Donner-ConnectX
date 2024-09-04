package com.springbootcrud.adminservice.controller;

import com.springbootcrud.adminservice.entity.DonationCamp;
import com.springbootcrud.adminservice.service.DonationCampService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/donationcamp")
@CrossOrigin
public class DonationCamp_ad_Controller {

    @Autowired
    private DonationCampService donationCampService;

    @PostMapping("/approve/{id}")
    public ResponseEntity<?> approveCamp(@PathVariable int id, @RequestParam boolean approved) {
        try {
            DonationCamp approvedCamp = donationCampService.approveDonationCamp(id, approved);
            return ResponseEntity.ok(approvedCamp);
        } catch (EntityNotFoundException e) {
            // Custom exception if the camp with the given ID is not found
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Donation camp with ID " + id + " not found.");
        } catch (Exception e) {
            // General exception catch-all
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request.");
        }
    }

    @GetMapping("/all")
    public List<DonationCamp> getAllCamps() {
        return donationCampService.getAllDonationCamps();
    }

    public class EntityNotFoundException extends RuntimeException {
        public EntityNotFoundException(String message) {
            super(message);
        }
    }

}
