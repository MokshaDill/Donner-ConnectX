package com.springbootcrud.adminservice.DTO;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class AdminDTO {
    @Id
    private int id;
    private String name;
    private String password;
    private String email;
    private String phone;
}
