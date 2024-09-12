package com.springbootcrud.contributorservice.controller;

import com.springbootcrud.contributorservice.entity.Contributor;
import com.springbootcrud.contributorservice.service.ContributorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contributor")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ContributorController {

    @Autowired
    private ContributorService contributorService;

    @PostMapping
    public ResponseEntity<Contributor> registerContributor(@RequestBody Contributor contributor) {
        return ResponseEntity.ok(contributorService.registerContributor(contributor));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contributor> updateContributor(@PathVariable Long id, @RequestBody Contributor contributor) {
        Contributor updatedContributor = contributorService.updateContributor(id, contributor);
        return updatedContributor != null ? ResponseEntity.ok(updatedContributor) : ResponseEntity.notFound().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContributor(@PathVariable Long id) {
        contributorService.deleteContributor(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contributor> getContributor(@PathVariable Long id) {
        Contributor contributor = contributorService.getContributor(id);
        return contributor != null ? ResponseEntity.ok(contributor) : ResponseEntity.notFound().build();
    }

    @GetMapping("/contributors")
    public ResponseEntity<List<Contributor>> getAllContributors() {
        return ResponseEntity.ok(contributorService.getAllContributors());
    }

}
