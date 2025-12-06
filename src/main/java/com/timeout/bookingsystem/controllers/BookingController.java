package com.timeout.bookingsystem.controllers;

import com.timeout.bookingsystem.dto.BookingResponse;
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
    public BookingResponse createBooking(
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

    @GetMapping("/email")
    public List<BookingResponse> getBookingByEmail(@RequestParam String email) {
        return bookingService.getBookingsByEmailResponse(email);
    }

    @GetMapping
    List<BookingResponse> getAllBookings() {
        return bookingService.getAllBookingsResponse();
    }

    @GetMapping("/{id}")
    public BookingResponse getBooking(@PathVariable Long id) {
        return bookingService.getBookingResponseById(id);
    }



}
