package com.timeout.bookingsystem.dto;

import java.time.LocalDateTime;

public record BookingResponse(
        Long id,

        String passengerFirstName,
        String passengerLastName,
        String passengerEmail,

        Long flightId,
        String flightNumber,

        String departureAirport,
        String arrivalAirport,
        LocalDateTime departureTime,

        String seatNumber,
        Double pricePaid,
        Integer milesEarned
        ) {}
