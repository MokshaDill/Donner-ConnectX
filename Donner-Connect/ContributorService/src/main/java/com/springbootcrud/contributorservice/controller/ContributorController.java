package com.springbootcrud.contributorservice.controller;

import com.springbootcrud.contributorservice.entity.Contributor;
import com.springbootcrud.contributorservice.service.ContributorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contributors")
public class ContributorController {

    @Autowired
    private ContributorService contributorService;

    @PostMapping("/register")
    public ResponseEntity<Contributor> registerContributor(@RequestBody Contributor contributor) {
        Contributor savedContributor = contributorService.registerContributor(contributor);
        return ResponseEntity.ok(savedContributor);
    }

    @PutMapping("/update")
    public ResponseEntity<Contributor> updateContributor(@RequestBody Contributor contributor) {
        Contributor updatedContributor = contributorService.updateContributor(contributor);
        return ResponseEntity.ok(updatedContributor);
    }

    @GetMapping
    public ResponseEntity<List<Contributor>> getAllContributors() {
        List<Contributor> contributors = contributorService.getAllContributors();
        return ResponseEntity.ok(contributors);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contributor> getContributorById(@PathVariable Long id) {
        Contributor contributor = contributorService.getContributorById(id);
        if (contributor == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(contributor);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContributor(@PathVariable Long id) {
        contributorService.deleteContributor(id);
        return ResponseEntity.noContent().build();
    }
}

