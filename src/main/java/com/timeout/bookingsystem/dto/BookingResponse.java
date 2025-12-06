package com.timeout.bookingsystem.dto;

public record BookingResponse(
        Long id,
        String passengerFirstName,
        String passengerLastName,
        String passengerEmail,
        String flightNumber,
        String seatNumber,
        Double pricePaid,
        Integer milesEarned
        ) {}
