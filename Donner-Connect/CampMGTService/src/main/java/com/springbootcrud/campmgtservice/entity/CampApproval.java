package com.springbootcrud.campmgtservice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
public class CampApproval {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String location;
    private LocalDate date;
    private LocalTime time;
    private boolean approved;
    private Long contributorId;

    // Constructors, getters, and setters

    public CampApproval() {
    }

    /**
     * Parameterized constructor for creating a CampApproval object.
     *
     * @param name The name of the blood camp.
     * @param location The location of the blood camp.
     * @param date The date of the blood camp.
     * @param time The time of the blood camp.
     * @param approved The approval status of the blood camp.
     * @param contributorId The ID of the contributor who created the blood camp.
     */

    public CampApproval(String name, String location, LocalDate date, LocalTime time, boolean approved, Long contributorId) {
        this.name = name;
        this.location = location;
        this.date = date;
        this.time = time;
        this.approved = approved;
        this.contributorId = contributorId;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalTime getTime() {
        return time;
    }

    public void setTime(LocalTime time) {
        this.time = time;
    }

    public boolean isApproved() {
        return approved;
    }

    public void setApproved(boolean approved) {
        this.approved = approved;
    }

    public Long getContributorId() {
        return contributorId;
    }

    public void setContributorId(Long contributorId) {
        this.contributorId = contributorId;
    }
}

