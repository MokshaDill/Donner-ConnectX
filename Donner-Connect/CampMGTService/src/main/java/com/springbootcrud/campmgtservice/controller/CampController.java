package com.springbootcrud.campmgtservice.controller;

import com.springbootcrud.campmgtservice.entity.Camp;
import com.springbootcrud.campmgtservice.service.CampService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/camp")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class CampController {

    @Autowired
    private CampService campService;

    @PostMapping
    public Camp createCamp(@RequestBody Camp camp) {
        return campService.createCamp(camp);
    }

    @PutMapping("/{id}")
    public Camp updateCamp(@PathVariable Long id, @RequestBody Camp campDetails) {
        return campService.updateCamp(id, campDetails);
    }

    @GetMapping("/{id}")
    public Camp getCampById(@PathVariable Long id) {
        return campService.getCampById(id);
    }

    @GetMapping("/contributor/{contributorId}")
    public List<Camp> getCampsByContributor(@PathVariable Long contributorId) {
        return campService.getCampsByContributor(contributorId);
    }

    @DeleteMapping("/{id}")
    public void deleteCamp(@PathVariable Long id) {
        campService.deleteCamp(id);
    }

    @GetMapping("/pending-approvals")
    public List<Camp> getAllPendingApprovalCamps() {
        return campService.getAllPendingApprovalCamps();
    }
}
