package com.timeout.bookingsystem.models;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "first_name", nullable = false)
    private String firstName;

    @Column(name = "last_name", nullable = false)
    private String lastName;

    @Column(name = "address")
    private String address;

    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @Column(name = "phone")
    private String phone;

    @Column(name = "birthdate")
    private LocalDate birthdate;

    @Column(name= "password", nullable = false)
    private String password;

    public User() {}

    public User(String firstName,
                String lastName,
                String address,
                String email,
                String phone,
                LocalDate birthdate,
                String password) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.email = email;
        this.phone = phone;
        this.birthdate = birthdate;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    // getters
    public String getFirstName() {
        return firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public String getAddress() {
        return address;
    }

    public String getEmail() {
        return email;
    }

    public String getPhone() {
        return phone;
    }

    public LocalDate getBirthdate() {
        return birthdate;
    }

    public String getPassword() { return password; }

    // setters
    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public void setBirthdate(LocalDate birthdate) {
        this.birthdate = birthdate;
    }

    public void setPassword(String password) { this.password = password; }
}
