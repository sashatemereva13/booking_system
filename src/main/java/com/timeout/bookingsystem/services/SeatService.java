package com.timeout.bookingsystem.services;

import com.timeout.bookingsystem.models.Plane;
import com.timeout.bookingsystem.models.Seat;
import com.timeout.bookingsystem.repositories.PlaneRepository;
import com.timeout.bookingsystem.repositories.SeatRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SeatService {

    private final SeatRepository seatRepository;
    private final PlaneRepository planeRepository;

    public SeatService(SeatRepository seatRepository, PlaneRepository planeRepository) {
        this.seatRepository = seatRepository;
        this.planeRepository = planeRepository;
    }

    public List<Seat> getAllSeats() {
        return seatRepository.findAll();
    }

    public Seat getSeatById(Long id) {
        return seatRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Seat not found with id: " + id));
    }

    public Seat createSeat(Long planeId, Seat seat) {
        Plane plane = planeRepository.findById(planeId)
                .orElseThrow(() -> new RuntimeException("Plane not found with id: " + planeId));

        seat.setPlane(plane);
        return seatRepository.save(seat);
    }

    public Seat updateSeat(Long id, Seat seat) {
        Seat existing = getSeatById(id);

        existing.setSeatNumber(seat.getSeatNumber());
        existing.setSeats(seat.getSeats());
        existing.setOccupied(seat.isOccupied());

        return seatRepository.save(existing);
    }

    public void deleteSeat(Long id) {
        Seat seat = getSeatById(id);
        seatRepository.delete(seat);
    }
    public List<Seat> getSeatsByPlane(Long planeId) {
        Plane plane = planeRepository.findById(planeId)
                .orElseThrow(() -> new RuntimeException("Plane not found with id: " + planeId));
        return seatRepository.findByPlane(plane);
    }

    public List<Seat> getAvailableSeats(Long planeId) {
        Plane plane = planeRepository.findById(planeId)
                .orElseThrow(() -> new RuntimeException("Plane not found with id: " + planeId));
        return seatRepository.findByPlaneAndOccupiedFalse(plane);
    }

    public List<Seat> getOccupiedSeats(Long planeId) {
        Plane plane = planeRepository.findById(planeId)
                .orElseThrow(() -> new RuntimeException("Plane not found with id: " + planeId));
        return seatRepository.findByPlaneAndOccupiedTrue(plane);
    }
}
