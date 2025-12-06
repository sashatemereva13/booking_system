package com.timeout.bookingsystem.models;

import jakarta.persistence.*;
import java.time.LocalDateTime;


@Entity
@Table(name = "flights")
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String flightNumber;

    // --- RELATIONSHIPS ---
    @ManyToOne
    @JoinColumn(name = "departure_airport_id", nullable = false)
    private Airport departureAirport;

    @ManyToOne
    @JoinColumn(name = "arrival_airport_id", nullable = false)
    private Airport arrivalAirport;

    @ManyToOne
    @JoinColumn(name = "plane_id", nullable = false)
    private Plane plane;

    @Column(nullable = false)
    private Double priceEconomy;

    @Column(nullable = false)
    private Double priceBusiness;

    @Column(nullable = false)
    private Double priceFirst;

    // --- DATE & TIME ---
    private LocalDateTime departureTime;
    private LocalDateTime arrivalTime;

    // --- CONSTRUCTORS ---
    public Flight() {}

    // --- GETTERS & SETTERS ---
    public Long getId() {return id;}

    public String getFlightNumber() { return flightNumber; }
    public void setFlightNumber(String flightNumber) { this.flightNumber = flightNumber; }

    public Airport getDepartureAirport() { return departureAirport; }
    public void setDepartureAirport(Airport departureAirport) { this.departureAirport = departureAirport; }

    public Airport getArrivalAirport() { return arrivalAirport; }
    public void setArrivalAirport(Airport arrivalAirport) { this.arrivalAirport = arrivalAirport; }

    public Plane getPlane() {return plane;}
    public void setPlane(Plane plane) { this.plane = plane;}

    public LocalDateTime getDepartureTime() {return departureTime;}
    public void setDepartureTime(LocalDateTime departureTime) {this.departureTime = departureTime;}

    public LocalDateTime getArrivalTime() {return arrivalTime;}
    public void setArrivalTime(LocalDateTime arrivalTime) {this.arrivalTime = arrivalTime;}

    public Double getPriceEconomy() {return priceEconomy;}
    public void setPriceEconomy(Double priceEconomy) {this.priceEconomy = priceEconomy;}

    public Double getPriceBusiness() {return priceBusiness;}
    public void setPriceBusiness(Double priceBusiness) {this.priceBusiness = priceBusiness;}

    public Double getPriceFirst() {return priceFirst;}
    public void setPriceFirst(Double priceFirst) {this.priceFirst = priceFirst;}
}



