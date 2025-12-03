package com.timeout.bookingsystem.models;

import jakarta.persistence.*;

@Entity
@Table(name = "seats")

public class Seat {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String seatNumber;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Seats seats;

    @Column(nullable = false)
    private boolean occupied = false;

    @ManyToOne
    @JoinColumn(name = "plane_id", nullable = false)
    private Plane plane;

    public Seat() {}

    public Seat(String seatNumber, Seats seats, Plane plane) {
        this.seatNumber = seatNumber;
        this.seats = seats;
        this.plane = plane;
        this.occupied = false;
    }

    public Long getId() { return id;}
    public String getSeatNumber() { return seatNumber; }
    public Seats getSeats() { return seats; }
    public boolean isOccupied() { return occupied; }
    public Plane getPlane() { return plane; }

    public void setSeatNumber(String seatNumber) { this.seatNumber = seatNumber; }
    public void setSeats(Seats seats) { this.seats = seats; }
    public void setOccupied(boolean occupied) { this.occupied = occupied; }
    public void setPlane(Plane plane) { this.plane = plane; }

}
