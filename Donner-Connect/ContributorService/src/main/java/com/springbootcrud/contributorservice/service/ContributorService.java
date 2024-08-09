package com.springbootcrud.contributorservice.service;

import com.springbootcrud.contributorservice.entity.Contributor;

import java.util.List;

public interface ContributorService {
    Contributor registerContributor(Contributor contributor);
    Contributor updateContributor(Contributor contributor);
    List<Contributor> getAllContributors();
    Contributor getContributorById(Long id);
    void deleteContributor(Long id);
}

