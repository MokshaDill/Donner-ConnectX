package com.springbootcrud.adminservice.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Data
public class DonationCamp {
    @Id
    private int id;
    private String name;
    private String location;
    private boolean approved;
    private String organizer;
}
