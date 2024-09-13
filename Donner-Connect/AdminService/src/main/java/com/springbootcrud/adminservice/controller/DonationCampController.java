package com.springbootcrud.adminservice.controller;

import com.springbootcrud.adminservice.entity.DonationCamp;
import com.springbootcrud.adminservice.service.DonationCampService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller class for handling Donation Camp related requests.
 * This class provides endpoints to create, update, delete, retrieve,
 * and approve donation camps.
 */

@RestController
@RequestMapping("/donationcamp")
@CrossOrigin(origins = "*")  // Adjust as needed for your security settings
public class DonationCampController {

    @Autowired
    private DonationCampService donationCampService;

    /**
     * Approves or disapproves a donation camp based on the provided id.
     *
     * @param id       The ID of the donation camp.
     * @param approved Whether the camp is approved or not.
     * @return ResponseEntity with the approved camp or an error message.
     */
    @PutMapping("/approve/{id}")
    public ResponseEntity<?> approveCamp(@PathVariable int id, @RequestParam boolean approved) {
        try {
            DonationCamp approvedCamp = donationCampService.approveDonationCamp(id, approved);
            return ResponseEntity.ok(approvedCamp);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Donation camp with ID " + id + " not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while processing the request.");
        }
    }

    /**
     * Retrieves all donation camps.
     *
     * @return ResponseEntity containing a list of all donation camps.
     */
    @GetMapping("/all")
    public ResponseEntity<List<DonationCamp>> getAllCamps() {
        try {
            List<DonationCamp> camps = donationCampService.getAllDonationCamps();
            return ResponseEntity.ok(camps);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
        }
    }

    /**
     * Creates a new donation camp.
     *
     * @param donationCamp The details of the camp to be created.
     * @return ResponseEntity containing the created camp or an error message.
     */
    @PostMapping("/create")
    public ResponseEntity<?> createCamp(@RequestBody DonationCamp donationCamp) {
        try {
            DonationCamp createdCamp = donationCampService.createDonationCamp(donationCamp);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCamp);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while creating the camp.");
        }
    }

    /**
     * Updates an existing donation camp based on the provided id.
     *
     * @param id           The ID of the camp to be updated.
     * @param donationCamp The updated details of the camp.
     * @return ResponseEntity with the updated camp or an error message.
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateCamp(@PathVariable int id, @RequestBody DonationCamp donationCamp) {
        try {
            DonationCamp updatedCamp = donationCampService.updateDonationCamp(id, donationCamp);
            return ResponseEntity.ok(updatedCamp);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Donation camp with ID " + id + " not found.");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the camp.");
        }
    }

    /**
     * Deletes a donation camp based on the provided id.
     *
     * @param id The ID of the camp to be deleted.
     * @return ResponseEntity with a success or error message.
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCamp(@PathVariable int id) {
        try {
            donationCampService.deleteDonationCamp(id);
            return ResponseEntity.ok().body(new ResponseMessage("Donation camp deleted successfully."));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ResponseMessage("Donation camp with ID " + id + " not found."));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(new ResponseMessage("An error occurred while deleting the camp."));
        }
    }

    /**
     * Wrapper class to return response messages in JSON format.
     */
    // ResponseMessage class to wrap the response messages
    public static class ResponseMessage {
        private String message;

        public ResponseMessage(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }

        public void setMessage(String message) {
            this.message = message;
        }
    }

}
