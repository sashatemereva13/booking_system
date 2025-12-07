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

    public List<Airport> getAllAirports() {
        return airportRepository.findAll();
    }

    public Airport createAirport(Airport airport) {
        return airportRepository.save(airport);
    }

    public Airport getAirportById(Long id) {
        return airportRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Airport not found with id: " + id));
    }

    public Airport updateAirport(Long id, Airport airport) {
        Airport existing = getAirportById(id);

        existing.setNameAirport(airport.getNameAirport());
        existing.setCityAirport(airport.getCityAirport());
        existing.setCountryAirport(airport.getCountryAirport());
        existing.setCode(airport.getCode());

        return airportRepository.save(existing);
    }

    public void deleteAirport(Long id) {
        Airport airport = getAirportById(id);
        airportRepository.delete(airport);
    }
}
