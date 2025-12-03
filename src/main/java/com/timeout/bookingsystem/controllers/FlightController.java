package com.timeout.bookingsystem.controllers;

import com.timeout.bookingsystem.models.Flight;
import com.timeout.bookingsystem.services.FlightService;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/flights")
public class FlightController {

    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }

    @GetMapping
    public List<Flight> getAllFlights() {
        return flightService.getAllFlights();
    }

    @PostMapping
    public Flight addFlight(@RequestBody Flight flight) {
        return flightService.createFlight(flight);
    }
}
