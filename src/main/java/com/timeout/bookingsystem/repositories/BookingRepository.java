package com.timeout.bookingsystem.repositories;

import com.timeout.bookingsystem.models.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {
List<Booking> findByPassengerEmail(String passengerEmail);
}
