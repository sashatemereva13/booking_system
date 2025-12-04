package com.timeout.bookingsystem.services;

import com.timeout.bookingsystem.models.Airport;
import com.timeout.bookingsystem.models.Flight;
import com.timeout.bookingsystem.models.Plane;

import com.timeout.bookingsystem.repositories.AirportRepository;
import com.timeout.bookingsystem.repositories.FlightRepository;
import com.timeout.bookingsystem.repositories.PlaneRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

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

        // --- Save the flight ---
        return flightRepository.save(flight);
    }

    public List<Flight> searchFlights(Long depId, Long arrId, LocalDate date) {

        Airport departure = airportRepository.findById(depId).orElseThrow(() -> new RuntimeException("Airport not found"));

        Airport arrival = airportRepository.findById(arrId).orElseThrow(() -> new RuntimeException("Airport not found"));

        if (date == null) {
            return flightRepository.findByDepartureAirportAndArrivalAirport(departure, arrival);
        }

        LocalDateTime start = date.atStartOfDay();
        LocalDateTime end = date.plusDays(1).atStartOfDay();

        return flightRepository.findByDepartureAirportAndArrivalAirportAndDepartureTimeBetween(
                departure, arrival,start, end
        );
    }
}
