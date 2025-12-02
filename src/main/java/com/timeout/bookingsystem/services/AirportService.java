package com.timeout.bookingsystem.services;

import com.timeout.bookingsystem.models.Airport;
import com.timeout.bookingsystem.repositories.AirportRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AirportService {

    private final AirportRepository airportRepository;

    public AirportService(AirportRepository airportRepository) {
        this.airportRepository = airportRepository;
    }

    public List<Airport> getAllAirports(){
        return airportRepository.findAll();
    }

    public Airport createAirport(Airport airport){
        return airportRepository.save(airport);
    }
}
