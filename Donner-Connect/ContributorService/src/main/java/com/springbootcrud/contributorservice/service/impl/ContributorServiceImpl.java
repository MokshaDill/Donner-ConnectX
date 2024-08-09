package com.springbootcrud.contributorservice.service.impl;

import com.springbootcrud.contributorservice.entity.Contributor;
import com.springbootcrud.contributorservice.repository.ContributorRepository;
import com.springbootcrud.contributorservice.service.ContributorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

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
        return contributorRepository.save(contributor);
    }

    @Override
    public List<Contributor> getAllContributors() {
        return contributorRepository.findAll();
    }

    @Override
    public Contributor getContributorById(Long id) {
        return contributorRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteContributor(Long id) {
        contributorRepository.deleteById(id);
    }
}

