package com.timeout.bookingsystem.models;

import jakarta.persistence.*;

@Entity
@Table(name = "planes")
public class Plane {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String model;

    private int seatsEconomy;
    private int seatsBusiness;
    private int seatsFirst;

    public Plane() {
    }

    public Plane(String model, int seatsEconomy, int seatsBusiness, int seatsFirst) {
        this.model = model;
        this.seatsEconomy = seatsEconomy;
        this.seatsBusiness = seatsBusiness;
        this.seatsFirst = seatsFirst;
    }

    public Long getId() {
        return id;
    }

    public String getModel() {
        return model;
    }

    public void setModel(String model) {
        this.model = model;
    }

    public int getSeatsEconomy() {
        return seatsEconomy;
    }

    public void setSeatsEconomy(int seatsEconomy) {
        this.seatsEconomy = seatsEconomy;
    }

    public int getSeatsBusiness() {
        return seatsBusiness;
    }

    public void setSeatsBusiness(int seatsBusiness) {
        this.seatsBusiness = seatsBusiness;
    }

    public int getSeatsFirst() {
        return seatsFirst;
    }

    public void setSeatsFirst(int seatsFirst) {
        this.seatsFirst = seatsFirst;
    }

}
