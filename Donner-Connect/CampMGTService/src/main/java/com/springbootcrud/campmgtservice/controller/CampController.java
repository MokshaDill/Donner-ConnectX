package com.springbootcrud.campmgtservice.controller;

import com.springbootcrud.campmgtservice.entity.Camp;
import com.springbootcrud.campmgtservice.service.CampService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * REST controller for managing blood camps.
 * Provides endpoints for creating, updating, retrieving, and deleting blood camps,
 * as well as handling camps pending approval.
 */

@RestController
@RequestMapping("/camp")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class CampController {

    @Autowired
    private CampService campService;

    /**
     * Creates a new blood camp.
     *
     * @param camp The Camp object containing details of the blood camp to be created.
     * @return ResponseEntity containing the created Camp object and HTTP status.
     */

    @PostMapping
    public ResponseEntity<Camp> createCamp(@RequestBody Camp camp) {
        try {
            Camp createdCamp = campService.createCamp(camp);
            return new ResponseEntity<>(createdCamp, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Updates an existing blood camp.
     *
     * @param id The ID of the blood camp to be updated.
     * @param campDetails The Camp object containing updated details.
     * @return The updated Camp object.
     */

    @PutMapping("/{id}")
    public Camp updateCamp(@PathVariable Long id, @RequestBody Camp campDetails) {
        return campService.updateCamp(id, campDetails);
    }

    /**
     * Retrieves a blood camp by its ID.
     *
     * @param id The ID of the blood camp to be retrieved.
     * @return ResponseEntity containing the Camp object and HTTP status.
     */

    @GetMapping("/{id}")
    public ResponseEntity<Camp> getCampById(@PathVariable Long id) {
        try {
            Camp camp = campService.getCampById(id);
            return new ResponseEntity<>(camp, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Retrieves all blood camps associated with a specific contributor.
     *
     * @param contributorId The ID of the contributor whose camps are to be retrieved.
     * @return ResponseEntity containing a list of Camp objects and HTTP status.
     */

    @GetMapping("/contributor/{contributorId}")
    public ResponseEntity<List<Camp>> getCampsByContributor(@PathVariable Long contributorId) {
        List<Camp> camps = campService.getCampsByContributor(contributorId);
        return new ResponseEntity<>(camps, HttpStatus.OK);
    }

    /**
     * Retrieves all blood camps.
     *
     * @return ResponseEntity containing a list of all Camp objects and HTTP status.
     */

    @GetMapping("/camps")
    public ResponseEntity<List<Camp>> getAllCamps() {
        List<Camp> camps = campService.getAllCamps();
        return new ResponseEntity<>(camps, HttpStatus.OK);
    }

    /**
     * Deletes a blood camp by its ID.
     *
     * @param id The ID of the blood camp to be deleted.
     * @return ResponseEntity with HTTP status indicating the result of the operation.
     */

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCamp(@PathVariable Long id) {
        try {
            campService.deleteCamp(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    /**
     * Retrieves all blood camps that are pending approval.
     *
     * @return ResponseEntity containing a list of Camp objects pending approval and HTTP status.
     */

    @GetMapping("/pending-approvals")
    public ResponseEntity<List<Camp>> getAllPendingApprovalCamps() {
        List<Camp> camps = campService.getAllPendingApprovalCamps();
        return new ResponseEntity<>(camps, HttpStatus.OK);
    }
}
