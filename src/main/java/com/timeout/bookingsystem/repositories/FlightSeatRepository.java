package com.timeout.bookingsystem.repositories;

import com.timeout.bookingsystem.models.Flight;
import com.timeout.bookingsystem.models.FlightSeat;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FlightSeatRepository extends JpaRepository<FlightSeat, Long>{

    List<FlightSeat> findByFlight(Flight flight);

    List<FlightSeat> findByFlightIdAndOccupiedFalse(Long flightId);
}
