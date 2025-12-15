package com.timeout.bookingsystem.controllers;

import com.timeout.bookingsystem.exceptions.SeatUnavailableException;
import com.timeout.bookingsystem.models.Seat;
import com.timeout.bookingsystem.services.SeatService;
import org.springframework.http.HttpStatus;
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

}