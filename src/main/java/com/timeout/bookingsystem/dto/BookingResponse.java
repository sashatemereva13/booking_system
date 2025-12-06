package com.timeout.bookingsystem.dto;

public record BookingResponse(
        Long id,
        String passengerName,
        String passengerEmail,
        String flightNumber,
        String seatNumber,
        Double pricePaid
        ) {}
