package com.timeout.bookingsystem.services;

import com.timeout.bookingsystem.dto.BookingResponse;
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

    public BookingResponse createBooking(Long flightId,
                                 Long seatId,
                                 String passengerName,
                                 String email) {

        Flight flight = flightRepository.findById(flightId).orElseThrow(() -> new RuntimeException("flight not found"));

        Seat seat = seatRepository.findById(seatId).orElseThrow(() -> new RuntimeException("seat not found"));

        if (seat.isOccupied()) {
            throw new SeatUnavailableException("Seat " + seat.getSeatNumber() + " is already booked.");
        }

        // determine the price
        double price;
        switch (seat.getSeats()) {
            case ECONOMY -> price = flight.getPriceEconomy();
            case BUSINESS -> price = flight.getPriceBusiness();
            case FIRST -> price = flight.getPriceFirst();
            default -> throw new RuntimeException("Unknown seat type");
        }

        seat.setOccupied(true);
        seatRepository.save(seat);

        Booking booking = new Booking(passengerName, email, flight, seat);
        booking.setPricePaid(price);

        return toResponse(booking);
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

    public List<BookingResponse> getBookingsByEmailResponse(String email) {
        return bookingRepository.findByPassengerEmail(email).stream().map(this::toResponse).toList();
    }

    public List<BookingResponse> getAllBookingsResponse() {
        return bookingRepository.findAll().stream().map(this::toResponse).toList();
    }

    public BookingResponse getBookingResponseById(Long id) {
        Booking booking = bookingRepository.findById(id).orElseThrow(() -> new RuntimeException("booking not found"));
        return toResponse(booking);
    }

    private BookingResponse toResponse(Booking booking) {
        return new BookingResponse(
                booking.getId(),
                booking.getPassengerName(),
                booking.getPassengerEmail(),
                booking.getFlight().getFlightNumber(),
                booking.getSeat().getSeatNumber(),
                booking.getPricePaid()
        );
    }

}
