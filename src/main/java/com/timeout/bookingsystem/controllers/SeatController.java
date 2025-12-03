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

    @GetMapping("/plane/{planeId}")
    public List<Seat> getSeatsForPlane(@PathVariable Long planeId) {
        return seatService.getSeatsByPlane(planeId);
    }

    @PostMapping("/generate/{planeId}")
    public List<Seat> generateSeats(@PathVariable Long planeId) {
        return seatService.generateSeatsForPlane(planeId);
    }

    @PostMapping("/{seatId}/select")
    public Seat selectSeat(@PathVariable Long seatId) {
        return seatService.selectSeat(seatId);
    }

    @PostMapping("/{seatId}/free")
    public Seat freeSeat(@PathVariable Long seatId) {
        return seatService.freeSeat(seatId);
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
