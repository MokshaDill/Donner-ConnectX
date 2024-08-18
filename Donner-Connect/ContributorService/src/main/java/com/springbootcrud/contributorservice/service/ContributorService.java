package com.springbootcrud.contributorservice.service;
import com.springbootcrud.contributorservice.entity.Contributor;
import java.util.List;

public interface ContributorService {
    Contributor registerContributor(Contributor contributor);

    Contributor updateContributor(Contributor contributor);

    Contributor updateContributor(Long id, Contributor contributor);

    void deleteContributor(Long id);

    Contributor getContributor(Long id);

    List<Contributor> getAllContributors();
}
