package com.timeout.bookingsystem.models;

import jakarta.persistence.*;

@Entity
@Table(name = "clients")
public class Client {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="firstname")
    private String firstName;

    @Column(name="lastname")
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    private Integer miles = 0;

    public Client() {}

    public Client(String firstName, String lastName, String email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.miles = 0;
    }

    public Long getId() {return id;}

    public String getFirstName() {return firstName;}
    public void setFirstName(String firstName) {this.firstName = firstName;}

    public String getLastName() {return lastName;}
    public void setLastName(String lastName) {this.lastName = lastName;}

    public String getEmail() {return email;}
    public void setEmail(String email) {this.email = email;}

    public Integer getMiles() {return miles;}
    public void setMiles(Integer miles) { this.miles = miles; }
    public void addMiles(int m) {this.miles += m;}


}
