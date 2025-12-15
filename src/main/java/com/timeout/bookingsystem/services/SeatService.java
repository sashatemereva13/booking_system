package com.timeout.bookingsystem.services;

import com.timeout.bookingsystem.models.Plane;
import com.timeout.bookingsystem.models.Seat;
import com.timeout.bookingsystem.models.Seats;
import com.timeout.bookingsystem.repositories.PlaneRepository;
import com.timeout.bookingsystem.repositories.SeatRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.ArrayList;

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

    // generate seats automatically for a plane
    public List<Seat> generateSeatsForPlane(Long planeId) {
        Plane plane = planeRepository.findById(planeId).orElseThrow(() -> new RuntimeException("Plane not found"));

        List<Seat> seats = new ArrayList<>();

        //Economy
        for (int i = 1; i <= plane.getSeatsEconomy(); i++) {
            seats.add(new Seat("E" + i, Seats.ECONOMY, plane));
        }

        // Business
        for (int i = 1; i <= plane.getSeatsBusiness(); i++) {
            seats.add(new Seat("B" + i, Seats.BUSINESS, plane));
        }

        // First
        for (int i = 1; i <= plane.getSeatsFirst(); i++) {
            seats.add(new Seat("F" + i, Seats.FIRST, plane));
        }

        return seatRepository.saveAll(seats);
    }
}
