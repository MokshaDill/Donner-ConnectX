package com.springbootcrud.authenticationservice.services;

import com.springbootcrud.authenticationservice.entity.Contributor;


public interface ContributorService {

    /**
     * @param email
     * @param password
     * @return
     */
    int GetUserContributorFromEmail(String email, String password);
}
