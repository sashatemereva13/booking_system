package com.timeout.bookingsystem.repositories;

import com.timeout.bookingsystem.models.Seat;
import com.timeout.bookingsystem.models.Plane;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SeatRepository extends JpaRepository<Seat, Long> {
    List<Seat> findByPlane(Plane plane);
    List<Seat> findByPlaneAndOccupiedFalse(Plane plane);
    List<Seat> findByPlaneAndOccupiedTrue(Plane plane);
}
