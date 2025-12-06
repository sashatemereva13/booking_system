package com.timeout.bookingsystem.services;

import com.timeout.bookingsystem.dto.FlightSearchResponse;
import com.timeout.bookingsystem.models.Airport;
import com.timeout.bookingsystem.models.Flight;
import com.timeout.bookingsystem.models.Plane;
import com.timeout.bookingsystem.models.Seats;
import com.timeout.bookingsystem.models.Seat;

import com.timeout.bookingsystem.repositories.AirportRepository;
import com.timeout.bookingsystem.repositories.FlightRepository;
import com.timeout.bookingsystem.repositories.PlaneRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.HashMap;


@Service
public class FlightService {

    private final FlightRepository flightRepository;
    private final AirportRepository airportRepository;
    private final PlaneRepository planeRepository;

    public FlightService(FlightRepository flightRepository,
                         AirportRepository airportRepository,
                         PlaneRepository planeRepository) {
        this.flightRepository = flightRepository;
        this.airportRepository = airportRepository;
        this.planeRepository = planeRepository;
    }

    public List<Flight> getAllFlights() {
        return flightRepository.findAll();
    }

    public Flight createFlight(Flight flight) {

        // --- Loaf real entities from DB ---
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

        flight.getPlane().setSeats(null);

        // --- Save the flight ---
        return flightRepository.save(flight);
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
            int eco = (int) flight.getPlane().getSeats().stream()
                    .filter(s -> s.getSeats() == Seats.ECONOMY && !s.isOccupied()).count();

            int bus = (int) flight.getPlane().getSeats().stream()
                    .filter(s -> s.getSeats() == Seats.BUSINESS && !s.isOccupied()).count();

            int fir = (int) flight.getPlane().getSeats().stream()
                    .filter(s -> s.getSeats() == Seats.FIRST && !s.isOccupied()).count();


            return new FlightSearchResponse(
                    flight.getId(),
                    flight.getFlightNumber(),
                    flight.getDepartureAirport().getCityAirport(),
                    flight.getArrivalAirport().getCityAirport(),
                    flight.getDepartureTime().toString(),
                    flight.getArrivalTime().toString(),
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

        List<Seat> seats = flight.getPlane().getSeats();

        Map<String, List<String>> result = new HashMap<>();
        result.put("economy", seats.stream()
                .filter(s -> s.getSeats() == Seats.ECONOMY && !s.isOccupied())
                .map(Seat::getSeatNumber)
                .toList());
        result.put("business", seats.stream()
                .filter(s -> s.getSeats() == Seats.BUSINESS && !s.isOccupied())
                .map(Seat::getSeatNumber)
                .toList());

        result.put("first", seats.stream()
                .filter(s -> s.getSeats() == Seats.FIRST && !s.isOccupied())
                .map(Seat::getSeatNumber)
                .toList());

        return result;
    }



}
