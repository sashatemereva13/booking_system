package com.timeout.bookingsystem.services;

import com.timeout.bookingsystem.models.Plane;
import com.timeout.bookingsystem.repositories.PlaneRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaneService {

    private final PlaneRepository planeRepository;

    public PlaneService(PlaneRepository planeRepository) {
        this.planeRepository = planeRepository;
    }

    public List<Plane> getAllPlanes() {
        return planeRepository.findAll();
    }

    public Plane createPlane(Plane plane) {
        return planeRepository.save(plane);
    }
}
