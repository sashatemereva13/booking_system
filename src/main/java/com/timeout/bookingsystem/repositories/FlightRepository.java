package com.timeout.bookingsystem.repositories;

import com.timeout.bookingsystem.models.Flight;
import org.springframework.data.jpa.repository.JpaRepository;

public interface FlightRepository extends JpaRepository<Flight, Long> {
}
