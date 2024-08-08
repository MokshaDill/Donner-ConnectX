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
public class Admin {
    @Id
    private int id;
    private String name;
    private String password;
    private String email;
    private String phone;
}
