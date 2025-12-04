package com.timeout.bookingsystem.controllers;

import com.timeout.bookingsystem.models.Booking;
import com.timeout.bookingsystem.services.BookingService;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/create")
    public Booking createBooking(
            @RequestParam Long flightId,
            @RequestParam Long seatId,
            @RequestParam String name,
            @RequestParam String email
    ) {
        return bookingService.createBooking(flightId, seatId, name, email);
    }
}
