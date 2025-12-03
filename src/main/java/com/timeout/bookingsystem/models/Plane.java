package com.timeout.bookingsystem.models;

import jakarta.persistence.*;

@Entity
@Table(name = "planes")
public class Plane {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String model;

    private Integer seatsEconomy;
    private Integer seatsBusiness;
    private Integer seatsFirst;

    public Plane() {
    }

    public Plane(String model, Integer seatsEconomy, Integer seatsBusiness, Integer seatsFirst) {
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

    public Integer getSeatsEconomy() {
        return seatsEconomy;
    }

    public void setSeatsEconomy(Integer seatsEconomy) {
        this.seatsEconomy = seatsEconomy;
    }

    public Integer getSeatsBusiness() {
        return seatsBusiness;
    }

    public void setSeatsBusiness(Integer seatsBusiness) {
        this.seatsBusiness = seatsBusiness;
    }

    public Integer getSeatsFirst() {
        return seatsFirst;
    }

    public void setSeatsFirst(Integer seatsFirst) {
        this.seatsFirst = seatsFirst;
    }

}
