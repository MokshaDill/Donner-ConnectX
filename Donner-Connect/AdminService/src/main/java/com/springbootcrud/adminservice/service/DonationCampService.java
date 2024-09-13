package com.springbootcrud.adminservice.service;

import com.springbootcrud.adminservice.entity.DonationCamp;

import java.util.List;

/**
 * Service interface for managing Donation Camps.
 * This interface defines the operations for creating, updating, retrieving,
 * approving, and deleting donation camps.
 */
public interface DonationCampService {

    /**
     * @param id       The ID of the donation camp to approve or disapprove.
     * @param approved A boolean value indicating whether the camp is approved (true) or not (false).
     * @return The updated DonationCamp object with the approval status.
     */
    DonationCamp approveDonationCamp(int id, boolean approved);

    /**
     * Retrieves a list of all donation camps.
     *
     * @return A list of DonationCamp objects representing all camps.
     */
    List<DonationCamp> getAllDonationCamps();

    /**
     * Creates a new donation camp.
     *
     * @param donationCamp The DonationCamp object containing the details of the camp to be created.
     * @return The created DonationCamp object.
     */
    DonationCamp createDonationCamp(DonationCamp donationCamp);

    /**
     * Updates an existing donation camp based on the provided id.
     *
     * @param id           The ID of the donation camp to be updated.
     * @param donationCamp The DonationCamp object containing the updated details.
     * @return The updated DonationCamp object.
     */
    DonationCamp updateDonationCamp(int id, DonationCamp donationCamp);

    /**
     * Deletes a donation camp based on the provided id.
     *
     * @param id The ID of the donation camp to be deleted.
     */
    void deleteDonationCamp(int id);
}
