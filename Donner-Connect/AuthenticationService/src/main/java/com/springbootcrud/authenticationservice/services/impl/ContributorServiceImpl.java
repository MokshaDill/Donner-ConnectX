package com.springbootcrud.authenticationservice.services.impl;

import com.springbootcrud.authenticationservice.entity.Contributor;
import com.springbootcrud.authenticationservice.repository.ContributorRepository;
import com.springbootcrud.authenticationservice.services.ContributorService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ContributorServiceImpl implements ContributorService {

    @Autowired
    final ContributorRepository contributorRepository;




    public ContributorServiceImpl(ContributorRepository contributorRepository) {
        this.contributorRepository = contributorRepository;
    }


    @Override
    public int GetUserContributorFromEmail(String email, String password) {
        return contributorRepository.getUserByEmailAndPassword(email, password);
    }
}
