package com.timeout.bookingsystem.controllers;

import com.timeout.bookingsystem.exceptions.SeatUnavailableException;
import com.timeout.bookingsystem.models.Booking;
import com.timeout.bookingsystem.services.BookingService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;


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

    @ExceptionHandler(SeatUnavailableException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public String handleSeatUnavailable(SeatUnavailableException ex) {
        return ex.getMessage();
    }

    @DeleteMapping("/{id}/cancel")
    public String cancelBooking(@PathVariable Long id) {
        bookingService.cancelBooking(id);
        return "Booking has been cancelled. The seat is now free.";
    }

    @GetMapping("/user")
    public List<Booking> getBookingByEmail(@RequestParam String email) {
        return bookingService.getBookingsByEmail(email);
    }

    @GetMapping List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/{id}")
    public Booking getBooking(@PathVariable Long id) {
        return bookingService.getBookingById(id);
    }

    @GetMapping("/by-email")
    public List<Booking> getBookingsByEmail(@RequestParam String email) {
        return bookingService.getBookingsByEmail(email);
    }


}
