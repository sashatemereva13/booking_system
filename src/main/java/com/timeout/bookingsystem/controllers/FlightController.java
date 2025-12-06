package com.timeout.bookingsystem.controllers;

import com.timeout.bookingsystem.dto.FlightSearchResponse;
import com.timeout.bookingsystem.dto.SeatResponse;
import com.timeout.bookingsystem.models.Flight;
import com.timeout.bookingsystem.services.FlightService;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;


@RestController
@RequestMapping("/flights")
public class FlightController {

    private final FlightService flightService;

    public FlightController(FlightService flightService) {
        this.flightService = flightService;
    }


    @GetMapping("/{id}/seats")
    public Object getSeatsByFlight(
            @PathVariable Long id,
            @RequestParam(required = false) String seatClass,
            @RequestParam(required = false) Boolean available
    ) {
        return flightService.getSeatsFiltered(id, seatClass, available);
    }

    @GetMapping
    public List<Flight> getAllFlights() {
        return flightService.getAllFlights();
    }

    @PostMapping
    public Flight addFlight(@RequestBody Flight flight) {
        return flightService.createFlight(flight);
    }

    @GetMapping("/search")
    public List<FlightSearchResponse> searchFlights(@RequestParam Long departureId,
                                                    @RequestParam Long arrivalId,
                                                    @RequestParam(required = false) String date) {
        return flightService.searchFlights(departureId, arrivalId,
                date != null ? LocalDate.parse(date) : null);
    }

    @GetMapping("/{id}/seats/filter")
    public List<SeatResponse> filterSeats(
            @PathVariable Long id,
            @RequestParam(required = false) String seatClass,
            @RequestParam(required = false) Boolean available
            ) {
        return flightService.getSeatsFiltered(id, seatClass, available);
    }

}
