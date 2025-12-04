package com.timeout.bookingsystem.models;

import jakarta.persistence.*;
import java.time.LocalDate;
import java.time.LocalDateTime;


@Entity
@Table (name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String passengerName;
    private String passengerEmail;

    @ManyToOne
    @JoinColumn (name = "flight_id", nullable = false)
    private Flight flight;

    @OneToOne
    @JoinColumn (name = "sear_id", nullable = false, unique = true)
    private Seat seat;

    private LocalDateTime bookedAt = LocalDateTime.now();

    public Booking() {}

    public Booking(String passengerName, String passengerEmail, Flight flight, Seat seat) {
        this.passengerName = passengerName;
        this.passengerEmail = passengerEmail;
        this.flight = flight;
        this.seat = seat;
        this.bookedAt = LocalDateTime.now();
    }

    public Long getId() {return id;}

    public String getPassengerName() {return passengerName;}
    public void setPassengerName(String passengerName) {this.passengerName = passengerName;}

    public String getPassengerEmail() {return passengerEmail;}
    public void setPassengerEmail(String passengerEmail) {this.passengerEmail = passengerEmail;}

    public Flight getFlight() {return flight;}
    public void setFlight(Flight flight) {this.flight = flight;}

    public Seat getSeat() {return seat;}
    public void setSeat(Seat seat) {this.seat = seat;}

    public LocalDateTime getBookedAt() {return bookedAt;}
}
