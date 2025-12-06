package com.timeout.bookingsystem.dto;

public record SeatResponse
        (
                Long id,
                String seatNumber,
                String seatClass,
                boolean occupied,
                double price
        ) {}
