package com.timeout.bookingsystem.services;

import com.timeout.bookingsystem.models.*;
import com.timeout.bookingsystem.repositories.SeatRepository;
import com.timeout.bookingsystem.repositories.PlaneRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;


@Service
public class SeatService {

    private final SeatRepository seatRepository;
    private final PlaneRepository planeRepository;

    public SeatService(SeatRepository seatRepository, PlaneRepository planeRepository) {
        this.seatRepository = seatRepository;
        this.planeRepository = planeRepository;
    }

    public List<Seat> getSeatsByPlane(Long planeId) {
        Plane plane = planeRepository.findById(planeId).orElseThrow(() -> new RuntimeException("Plane not found"));

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

    public Seat selectSeat(Long seatId) {
        Seat seat = seatRepository.findById(seatId).orElseThrow(() -> new RuntimeException("Seat not found"));

        if (seat.isOccupied()) {
            throw new RuntimeException("Seat is already occupied");
        }

        seat.setOccupied(true);
        return seatRepository.save(seat);
    }

    public Seat freeSeat(Long seatId) {
        Seat seat = seatRepository.findById(seatId).orElseThrow(() -> new RuntimeException("Seat not found"));

        seat.setOccupied(false);
        return seatRepository.save(seat);
    }

    public List<Seat> getAvailableSeats(Long planeId) {
        Plane plane = planeRepository.findById(planeId).orElseThrow(() -> new RuntimeException("Plane not found"));
        return seatRepository.findByPlaneAndOccupiedFalse(plane);
    }

    public List<Seat> getOccupiedSeats(Long planeId) {
        Plane plane = planeRepository.findById(planeId).orElseThrow(() -> new RuntimeException("Plane not found"));
        return seatRepository.findByPlaneAndOccupiedTrue(plane);
    }
}
