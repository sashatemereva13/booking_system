package com.timeout.bookingsystem.services;

import com.timeout.bookingsystem.exceptions.SeatUnavailableException;
import com.timeout.bookingsystem.models.*;
import com.timeout.bookingsystem.repositories.*;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final FlightRepository flightRepository;
    private final SeatRepository seatRepository;

    public BookingService(BookingRepository bookingRepository,
                          FlightRepository flightRepository,
                          SeatRepository seatRepository) {
        this.bookingRepository = bookingRepository;
        this.flightRepository = flightRepository;
        this.seatRepository = seatRepository;
    }

    public Booking createBooking(Long flightId,
                                 Long seatId,
                                 String passengerName,
                                 String email) {

        Flight flight = flightRepository.findById(flightId).orElseThrow(() -> new RuntimeException("flight not found"));

        Seat seat = seatRepository.findById(seatId).orElseThrow(() -> new RuntimeException("seat not found"));

        if (seat.isOccupied()) {
            throw new SeatUnavailableException("Seat " + seat.getSeatNumber() + " is already booked.");
        }

        seat.setOccupied(true);
        seatRepository.save(seat);

        Booking booking = new Booking(passengerName, email, flight, seat);
        return bookingRepository.save(booking);
    }

    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("booking not found"));

        // free the seat
        Seat seat = booking.getSeat();
        seat.setOccupied(false);
        seatRepository.save(seat);

        // delete the record
        bookingRepository.delete(booking);
    }

    public List<Booking> getBookingsByEmail(String email) {
        return bookingRepository.findByPassengerEmail(email);
    }

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    public Booking getBookingById(Long id) {
        return bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("booking not found"));
    }

}
