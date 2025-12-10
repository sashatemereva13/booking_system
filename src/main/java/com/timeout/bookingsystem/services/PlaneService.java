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

    public Plane getPlaneById(Long id) {
        return planeRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Plane not found with id: " + id));
    }

    public Plane createPlane(Plane plane) {
        return planeRepository.save(plane);
    }


    public Plane updatePlane(Long id, Plane plane) {
        Plane existing = getPlaneById(id);

        existing.setModel(plane.getModel());
        existing.setSeatsEconomy(plane.getSeatsEconomy());
        existing.setSeatsBusiness(plane.getSeatsBusiness());
        existing.setSeatsFirst(plane.getSeatsFirst());

        return planeRepository.save(existing);
    }

    public void deletePlane(Long id) {
        Plane plane = getPlaneById(id);
        planeRepository.delete(plane);
    }
}
