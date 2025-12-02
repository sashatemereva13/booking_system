package com.timeout.bookingsystem.controllers;

import com.timeout.bookingsystem.models.Plane;
import com.timeout.bookingsystem.services.PlaneService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/planes")
public class PlaneController {

    private final PlaneService planeService;

    public PlaneController(PlaneService planeService) {
        this.planeService = planeService;
    }

    @GetMapping
    public List<Plane> getAllPlanes() {
        return planeService.getAllPlanes();
    }

    @PostMapping
    public Plane addPlane(@RequestBody Plane plane) {
        return planeService.createPlane(plane);
    }
}
