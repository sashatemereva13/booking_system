package com.timeout.bookingsystem.repositories;

import com.timeout.bookingsystem.models.Flight;
import com.timeout.bookingsystem.models.Airport;

import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface FlightRepository extends JpaRepository<Flight, Long> {

    // search by departure + arrival only
    List<Flight> findByDepartureAirportAndArrivalAirport(Airport from, Airport to);

    // search flights for a specific date range
    List<Flight> findByDepartureAirportAndArrivalAirportAndDepartureTimeBetween(
            Airport from,
            Airport to,
            LocalDateTime start,
            LocalDateTime end
    );

}
