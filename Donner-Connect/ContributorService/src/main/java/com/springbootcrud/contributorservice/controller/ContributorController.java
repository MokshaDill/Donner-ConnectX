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

    /**
     * Registers a new contributor.
     *
     * @param contributor The Contributor object containing the details of the contributor to be registered.
     * @return ResponseEntity with the registered Contributor object.
     */

    @PostMapping
    public ResponseEntity<Contributor> registerContributor(@RequestBody Contributor contributor) {
        return ResponseEntity.ok(contributorService.registerContributor(contributor));
    }

    /**
     * Updates an existing contributor by ID.
     *
     * @param id The ID of the contributor to be updated.
     * @param contributor The Contributor object containing the updated details.
     * @return ResponseEntity with the updated Contributor object, or a 404 Not Found if the contributor does not exist.
     */

    @PutMapping("/{id}")
    public ResponseEntity<Contributor> updateContributor(@PathVariable Long id, @RequestBody Contributor contributor) {
        Contributor updatedContributor = contributorService.updateContributor(id, contributor);
        return updatedContributor != null ? ResponseEntity.ok(updatedContributor) : ResponseEntity.notFound().build();
    }

    /**
     * Deletes a contributor by ID.
     *
     * @param id The ID of the contributor to be deleted.
     * @return ResponseEntity with no content.
     */

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContributor(@PathVariable Long id) {
        contributorService.deleteContributor(id);
        return ResponseEntity.noContent().build();
    }

    /**
     * Retrieves a contributor by ID.
     *
     * @param id The ID of the contributor to be retrieved.
     * @return ResponseEntity with the Contributor object, or a 404 Not Found if the contributor does not exist.
     */

    @GetMapping("/{id}")
    public ResponseEntity<Contributor> getContributor(@PathVariable Long id) {
        Contributor contributor = contributorService.getContributor(id);
        return contributor != null ? ResponseEntity.ok(contributor) : ResponseEntity.notFound().build();
    }

    /**
     * Retrieves all contributors.
     *
     * @return ResponseEntity with a list of all Contributor objects.
     */

    @GetMapping("/contributors")
    public ResponseEntity<List<Contributor>> getAllContributors() {
        return ResponseEntity.ok(contributorService.getAllContributors());
    }

}
