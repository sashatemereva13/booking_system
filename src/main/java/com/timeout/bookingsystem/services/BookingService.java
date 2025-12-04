package com.timeout.bookingsystem.services;

import com.timeout.bookingsystem.models.*;
import com.timeout.bookingsystem.repositories.*;
import org.springframework.stereotype.Service;


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
            throw new RuntimeException("seat is already occupied");
        }

        seat.setOccupied(true);
        seatRepository.save(seat);

        Booking booking = new Booking(passengerName, email, flight, seat);
        return bookingRepository.save(booking);
    }
}
