package com.timeout.bookingsystem.dto;

import java.time.LocalDateTime;

public record FlightDetailsResponse(
        Long id,

        String departureAirport,
        String arrivalAirport,

        LocalDateTime departureTime,
        LocalDateTime arrivalTime,

        String planeModel,

        int economySeatsLeft,
        int businessSeatsLeft,
        int firstSeatsLeft,

        double priceEconomy,
        double priceBusiness,
        double priceFirst
) {}
