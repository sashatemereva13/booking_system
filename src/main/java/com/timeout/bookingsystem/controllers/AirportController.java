package com.timeout.bookingsystem.controllers;

import com.timeout.bookingsystem.models.Airport;
import com.timeout.bookingsystem.services.AirportService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/airports")

public class AirportController {

    private final AirportService airportService;

    public AirportController(AirportService airportService) {
        this.airportService = airportService;
    }

    @GetMapping
    public List<Airport> getAllAirports() {
        return airportService.getAllAirports();
    }

    @PostMapping
    public Airport addAirport(@RequestBody Airport airport) {
        return airportService.createAirport(airport);
    }
}
