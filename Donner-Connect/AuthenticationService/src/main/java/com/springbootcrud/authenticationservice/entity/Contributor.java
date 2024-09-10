package com.springbootcrud.authenticationservice.entity;


import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table
public class Contributor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String address;
    private String city;
    private String name;
    private String email;
    private String nic;
    private String phoneNumber;
    private String password;

    public Contributor() {

    }

    public Contributor(String name, String email, String nic, String address, String city, String phoneNumber, String password) {
        super();
        this.name = name;
        this.email = email;
        this.nic = nic;
        this.address = address;
        this.city = city;
        this.phoneNumber = phoneNumber;
        this.password = password;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setNic(String nic) {
        this.nic = nic;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "Contributor{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", nic='" + nic + '\'' +
                ", address='" + address + '\'' +
                ", city='" + city + '\'' +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", password='" + password + '\'' +
                '}';
    }
}
