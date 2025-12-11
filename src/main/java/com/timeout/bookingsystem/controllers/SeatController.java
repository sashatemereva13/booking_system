package com.timeout.bookingsystem.controllers;

import com.timeout.bookingsystem.models.Seat;
import com.timeout.bookingsystem.services.SeatService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/seats")
public class SeatController {

    private final SeatService seatService;

    public SeatController(SeatService seatService) {
        this.seatService = seatService;
    }

    @GetMapping
    public List<Seat> getAllSeats() {
        return seatService.getAllSeats();
    }

    @GetMapping("/{id}")
    public Seat getSeatById(@PathVariable Long id) {
        return seatService.getSeatById(id);
    }

    @PostMapping("/plane/{planeId}")
    public Seat createSeat(@PathVariable Long planeId, @RequestBody Seat seat) {
        return seatService.createSeat(planeId, seat);
    }

    @PutMapping("/{id}")
    public Seat updateSeat(@PathVariable Long id, @RequestBody Seat seat) {
        return seatService.updateSeat(id, seat);
    }

    @DeleteMapping("/{id}")
    public void deleteSeat(@PathVariable Long id) {
        seatService.deleteSeat(id);
    }

    @GetMapping("/plane/{planeId}")
    public List<Seat> getSeatsByPlane(@PathVariable Long planeId) {
        return seatService.getSeatsByPlane(planeId);
    }

    @GetMapping("/plane/{planeId}/available")
    public List<Seat> getAvailableSeats(@PathVariable Long planeId) {
        return seatService.getAvailableSeats(planeId);
    }

    @GetMapping("/plane/{planeId}/occupied")
    public List<Seat> getOccupiedSeats(@PathVariable Long planeId) {
        return seatService.getOccupiedSeats(planeId);
    }
}
