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

    private String passengerFirstName;
    private String passengerLastName;
    private String passengerEmail;

    @ManyToOne
    @JoinColumn (name = "flight_id", nullable = false)
    private Flight flight;

    @ManyToOne
    @JoinColumn (name = "flight_seat_id", nullable = false)
    private FlightSeat seat;

    @Column(nullable = false)
    private Double pricePaid;

    private LocalDateTime bookingTime = LocalDateTime.now();

    public Booking() {}

    public Booking(String passengerFirstName, String passengerLastName, String passengerEmail, Flight flight, FlightSeat seat) {
        this.passengerFirstName = passengerFirstName;
        this.passengerLastName = passengerLastName;
        this.passengerEmail = passengerEmail;
        this.flight = flight;
        this.seat = seat;
        this.bookingTime = LocalDateTime.now();
    }

    public Long getId() {return id;}

    public String getPassengerFirstName() {return passengerFirstName;}
    public void setPassengerName(String passengerFirstName) {this.passengerFirstName = passengerFirstName;}

    public String getPassengerLastName() {return passengerLastName;}
    public void setPassengerLastName(String passengerLastName) {this.passengerLastName = passengerLastName;}

    public String getPassengerEmail() {return passengerEmail;}
    public void setPassengerEmail(String passengerEmail) {this.passengerEmail = passengerEmail;}

    public Flight getFlight() {return flight;}
    public void setFlight(Flight flight) {this.flight = flight;}

    public FlightSeat getSeat() {return seat;}
    public void setSeat(FlightSeat seat) {this.seat = seat;}

    public LocalDateTime getBookedAt() {return bookingTime;}

    public Double getPricePaid() {return pricePaid;}
    public void setPricePaid(Double pricePaid) {this.pricePaid = pricePaid;}
}
