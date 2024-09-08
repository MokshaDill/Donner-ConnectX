package com.springbootcrud.contributorservice.service.impl;


import com.springbootcrud.contributorservice.entity.Contributor;
import com.springbootcrud.contributorservice.repository.ContributorRepository;
import com.springbootcrud.contributorservice.service.ContributorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ContributorServiceImpl implements ContributorService {
    @Autowired
    private ContributorRepository contributorRepository;

    @Override
    public Contributor registerContributor(Contributor contributor) {
        return contributorRepository.save(contributor);
    }

    @Override
    public Contributor updateContributor(Contributor contributor) {
        return null;
    }

    @Override
    public Contributor updateContributor(Long id, Contributor contributor) {
        if(contributorRepository.existsById(id)) {
            contributor.setId(id);
            return contributorRepository.save(contributor);
        }
        return null;
    }

    @Override
    public void deleteContributor(Long id) {
        contributorRepository.deleteById(id);
    }

    @Override
    public Contributor getContributor(Long id) {
        Optional<Contributor> contributor = contributorRepository.findById(id);
        return contributor.orElse(null);
    }

    @Override
    public List<Contributor> getAllContributors() {
        return contributorRepository.findAll();
    }



}
