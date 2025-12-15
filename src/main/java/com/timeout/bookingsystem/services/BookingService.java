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
    private final FlightSeatRepository flightSeatRepository;
    private final ClientRepository clientRepository;

    public BookingService(BookingRepository bookingRepository,
                          FlightRepository flightRepository,
                          FlightSeatRepository flightSeatRepository,
                          ClientRepository clientRepository) {
        this.bookingRepository = bookingRepository;
        this.flightRepository = flightRepository;
        this.flightSeatRepository = flightSeatRepository;
        this.clientRepository = clientRepository;
    }

    public BookingResponse createBooking(Long flightId,
                                 Long seatId,
                                 String passengerFirstName,
                                 String passengerLastName,
                                 String email) {


        Flight flight = flightRepository.findById(flightId).orElseThrow(() -> new RuntimeException("flight not found"));

        FlightSeat seat = flightSeatRepository.findById(seatId).orElseThrow(() -> new RuntimeException("seat not found"));

        if (seat.isOccupied()) {
            throw new SeatUnavailableException("Seat " + seat.getSeatNumber() + " is already booked.");
        }

        // determine the price
        double price = switch (seat.getSeatClass()) {
            case ECONOMY -> flight.getPriceEconomy();
            case BUSINESS -> flight.getPriceBusiness();
            case FIRST -> flight.getPriceFirst();
        };



        seat.setOccupied(true);
        flightSeatRepository.save(seat);

        Booking booking = new Booking(passengerFirstName, passengerLastName, email, flight, seat);
        booking.setPricePaid(price);
        bookingRepository.save(booking);

        // find or create Client
        Client client = clientRepository.findByEmail(email).orElseGet(() -> clientRepository.save(new Client(passengerFirstName, passengerLastName, email)));

        int milesEarned = (int)(price * 5);
        client.addMiles(milesEarned);
        clientRepository.save(client);

        return toResponse(booking);
    }

    public void cancelBooking(Long bookingId) {
        Booking booking = bookingRepository.findById(bookingId).orElseThrow(() -> new RuntimeException("booking not found"));

        // free the seat
        FlightSeat seat = booking.getSeat();
        seat.setOccupied(false);
        flightSeatRepository.save(seat);

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

    public int getMilesByEmail(String email) {
        return clientRepository.findByEmail(email).map(Client::getMiles).orElse(0);
    }

    private BookingResponse toResponse(Booking booking) {

        Flight flight = booking.getFlight();

        // find client to read miles
        Client client = clientRepository.findByEmail(booking.getPassengerEmail())
                .orElse(null);

        Integer miles = (client != null) ? client.getMiles() : 0;

        return new BookingResponse(
                booking.getId(),

                booking.getPassengerFirstName(),
                booking.getPassengerLastName(),
                booking.getPassengerEmail(),

                flight.getId(),
                flight.getFlightNumber(),

                flight.getDepartureAirport().getCityAirport(),
                flight.getArrivalAirport().getCityAirport(),
                flight.getDepartureTime(),

                booking.getSeat().getSeatNumber(),
                booking.getPricePaid(),
                miles
        );
    }

}
