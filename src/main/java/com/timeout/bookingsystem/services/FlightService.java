package com.timeout.bookingsystem.services;

import com.timeout.bookingsystem.dto.FlightSearchResponse;
import com.timeout.bookingsystem.dto.SeatResponse;
import com.timeout.bookingsystem.models.*;

import com.timeout.bookingsystem.repositories.AirportRepository;
import com.timeout.bookingsystem.repositories.FlightRepository;
import com.timeout.bookingsystem.repositories.FlightSeatRepository;
import com.timeout.bookingsystem.repositories.PlaneRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.HashMap;


@Service
public class FlightService {

    private final FlightRepository flightRepository;
    private final AirportRepository airportRepository;
    private final PlaneRepository planeRepository;
    private final FlightSeatRepository flightSeatRepository;

    public FlightService(FlightRepository flightRepository,
                         AirportRepository airportRepository,
                         PlaneRepository planeRepository,
                         FlightSeatRepository flightSeatRepository) {
        this.flightRepository = flightRepository;
        this.airportRepository = airportRepository;
        this.planeRepository = planeRepository;
        this.flightSeatRepository = flightSeatRepository;
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Flight createFlight(Flight flight) {

        // --- Load real entities from DB ---
        Airport departureAirport = airportRepository.findById(flight.getDepartureAirport().getId()).orElseThrow(() -> new RuntimeException("Departure airport not found"));

        Airport arrivalAirport = airportRepository.findById(
                flight.getArrivalAirport().getId()
        ).orElseThrow(() -> new RuntimeException("Arrival airport not found"));

        Plane plane = planeRepository.findById(
                flight.getPlane().getId()
        ).orElseThrow(() -> new RuntimeException("Plane not found"));

        // --- Attach them to the flight ---
        flight.setDepartureAirport(departureAirport);
        flight.setArrivalAirport(arrivalAirport);
        flight.setPlane(plane);

        // --- Save the flight ---
        return flightRepository.save(flight);
    }

    /**
     * Ensures that this flight has its own set of FlightSeat entries.
     * If none exist yet, they are created based on the plane's seat layout.
     */
    private List<FlightSeat> initSeatsForFlightIfNeeded(Flight flight) {

        List<FlightSeat> existing = flightSeatRepository.findByFlight(flight);
        if (!existing.isEmpty()) {
            return existing;
        }

        Plane plane = flight.getPlane();
        List<Seat> templateSeats = plane.getSeats();

        if (templateSeats == null || templateSeats.isEmpty()) {
            throw new RuntimeException("Plane had no seat layout defined");
        }

        List<FlightSeat> toSave = new ArrayList<>();
        for (Seat s : templateSeats) {

            FlightSeat fs = new FlightSeat();
            fs.setFlight(flight);
            fs.setSeatNumber(s.getSeatNumber());
            fs.setSeatClass(s.getSeats());
            fs.setOccupied(false);
            toSave.add(fs);
        }

        return flightSeatRepository.saveAll(toSave);
    }

    public List<FlightSearchResponse> searchFlights(Long depId, Long arrId, LocalDate date) {

        Airport departure = airportRepository.findById(depId).orElseThrow(() -> new RuntimeException("Airport not found"));

        Airport arrival = airportRepository.findById(arrId).orElseThrow(() -> new RuntimeException("Airport not found"));

        List<Flight> flights;

        if (date == null) {
            flights = flightRepository.findByDepartureAirportAndArrivalAirport(departure, arrival);
        } else {
            LocalDateTime start = date.atStartOfDay();
            LocalDateTime end = date.plusDays(1).atStartOfDay();

            flights = flightRepository.findByDepartureAirportAndArrivalAirportAndDepartureTimeBetween(
                    departure, arrival, start, end
            );
        }

        return flights.stream().map(flight -> {

            // make sure this flight has the FlightSeat rows
            List<FlightSeat> flightSeats = initSeatsForFlightIfNeeded(flight);

            int eco = (int) flightSeats.stream()
                    .filter(s -> s.getSeatClass() == Seats.ECONOMY && !s.isOccupied()).count();

            int bus = (int) flightSeats.stream()
                    .filter(s -> s.getSeatClass() == Seats.BUSINESS && !s.isOccupied()).count();

            int fir = (int) flightSeats.stream()
                    .filter(s -> s.getSeatClass() == Seats.FIRST && !s.isOccupied()).count();


            return new FlightSearchResponse(
                    flight.getId(),
                    flight.getFlightNumber(),

                    flight.getDepartureAirport().getCityAirport(),
                    flight.getArrivalAirport().getCityAirport(),

                    flight.getDepartureTime() != null ? flight.getDepartureTime().toString() : null,
                    flight.getArrivalTime() != null ? flight.getArrivalTime().toString() : null,

                    eco, bus, fir,

                    flight.getPriceEconomy(),
                    flight.getPriceBusiness(),
                    flight.getPriceFirst()
            );


        }).toList();
    }

    public Map<String, List<String>> getSeatsForFlight(Long flightId) {
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        List<FlightSeat> flightSeats = initSeatsForFlightIfNeeded(flight);

        Map<String, List<String>> result = new HashMap<>();
        result.put("economy", flightSeats.stream()
                .filter(s -> s.getSeatClass() == Seats.ECONOMY && !s.isOccupied())
                .map(FlightSeat::getSeatNumber)
                .toList());
        result.put("business", flightSeats.stream()
                .filter(s -> s.getSeatClass() == Seats.BUSINESS && !s.isOccupied())
                .map(FlightSeat::getSeatNumber)
                .toList());

        result.put("first", flightSeats.stream()
                .filter(s -> s.getSeatClass() == Seats.FIRST && !s.isOccupied())
                .map(FlightSeat::getSeatNumber)
                .toList());

        return result;
    }

    public List<SeatResponse> getAllSeatsResponse(Long flightId) {
        Flight flight = flightRepository.findById(flightId)
                .orElseThrow(() -> new RuntimeException("Flight not found"));

        List<FlightSeat> seats = initSeatsForFlightIfNeeded(flight);

        return seats.stream().map(s -> {

            double price = switch (s.getSeatClass()) {
                case ECONOMY -> flight.getPriceEconomy();
                case BUSINESS -> flight.getPriceBusiness();
                case FIRST -> flight.getPriceFirst();
            };

            return new SeatResponse(
                    s.getId(),
                    s.getSeatNumber(),
                    s.getSeatClass().name(),
                    s.isOccupied(),
                    price

            );
        }).toList();
    }

    public List<SeatResponse> getAvailableSeatsResponse(Long flightId) {
        return getAllSeatsResponse(flightId).stream()
                .filter(s -> !s.occupied())
                .toList();
    }

    public List<SeatResponse> getSeatsFiltered(Long flightId, String seatClass, Boolean available) {

        Flight flight = flightRepository.findById(flightId).orElseThrow(() -> new RuntimeException("Flight not found"));

        List<FlightSeat> seats = initSeatsForFlightIfNeeded(flight);

        return seats.stream()

                //filter by class if provided
                .filter(s -> seatClass == null || s.getSeatClass().name().equals(seatClass))

                // filter by availability if provided
                .filter(s -> available == null || (!s.isOccupied() == available))

                .map(s -> {

                    // determine price based on seat class
                    double price = switch (s.getSeatClass()) {
                        case ECONOMY -> flight.getPriceEconomy();
                        case BUSINESS -> flight.getPriceBusiness();
                        case FIRST -> flight.getPriceFirst();
                    };

                    return new SeatResponse(
                            s.getId(),
                            s.getSeatNumber(),
                            s.getSeatClass().name(),
                            s.isOccupied(),
                            price
                    );
                })

                .toList();
    }}
