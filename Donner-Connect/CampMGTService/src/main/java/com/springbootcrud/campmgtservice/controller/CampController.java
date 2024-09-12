package com.springbootcrud.campmgtservice.controller;

import com.springbootcrud.campmgtservice.entity.Camp;
import com.springbootcrud.campmgtservice.service.CampService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/camp")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class CampController {

    @Autowired
    private CampService campService;

    @PostMapping
    public ResponseEntity<Camp> createCamp(@RequestBody Camp camp) {
        try {
            Camp createdCamp = campService.createCamp(camp);
            return new ResponseEntity<>(createdCamp, HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping("/{id}")
    public Camp updateCamp(@PathVariable Long id, @RequestBody Camp campDetails) {
        return campService.updateCamp(id, campDetails);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Camp> getCampById(@PathVariable Long id) {
        try {
            Camp camp = campService.getCampById(id);
            return new ResponseEntity<>(camp, HttpStatus.OK);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(null, HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/contributor/{contributorId}")
    public ResponseEntity<List<Camp>> getCampsByContributor(@PathVariable Long contributorId) {
        List<Camp> camps = campService.getCampsByContributor(contributorId);
        return new ResponseEntity<>(camps, HttpStatus.OK);
    }

    @GetMapping("/camps")
    public ResponseEntity<List<Camp>> getAllCamps() {
        List<Camp> camps = campService.getAllCamps();
        return new ResponseEntity<>(camps, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCamp(@PathVariable Long id) {
        try {
            campService.deleteCamp(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }

    @GetMapping("/pending-approvals")
    public ResponseEntity<List<Camp>> getAllPendingApprovalCamps() {
        List<Camp> camps = campService.getAllPendingApprovalCamps();
        return new ResponseEntity<>(camps, HttpStatus.OK);
    }
}
