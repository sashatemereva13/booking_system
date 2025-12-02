package com.timeout.bookingsystem.repositories;

import com.timeout.bookingsystem.models.Airport;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AirportRepository extends JpaRepository<Airport, Long>{
}
