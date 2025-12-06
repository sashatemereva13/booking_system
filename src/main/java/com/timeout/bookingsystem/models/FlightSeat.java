package com.timeout.bookingsystem.models;

import jakarta.persistence.*;


@Entity
@Table(name = "flight_seats")
public class FlightSeat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // the flight this particular seat is for
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flight_id", nullable = false)
    private Flight flight;

    // seat number
    @Column(nullable = false)
    private String seatNumber;

    // economy or business or first
    @Enumerated(EnumType.STRING)
    @Column(name = "seat_class", nullable = false)
    private Seats seatClass;

    // check if booked
    @Column(nullable = false)
    private boolean occupied = false;

    public FlightSeat() {}

    public Long getId() {
        return id;
    }

    public Flight getFlight() {
        return flight;
    }

    public void setFlight(Flight flight) {
        this.flight = flight;
    }

    public String getSeatNumber() {
        return seatNumber;
    }

    public void setSeatNumber(String seatNumber) {
        this.seatNumber = seatNumber;
    }

    public Seats getSeatClass() {
        return seatClass;
    }

    public void setSeatClass(Seats seatClass) {
        this.seatClass = seatClass;
    }

    public boolean isOccupied() {
        return occupied;
    }

    public void setOccupied(boolean occupied) {
        this.occupied = occupied;
    }

}
