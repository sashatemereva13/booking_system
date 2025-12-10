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

    public Plane updatePlane(Long id, Plane planeDetails) {
        Plane plane = getPlaneById(id);

        plane.setNamePlane(planeDetails.getNamePlane());
        plane.setModel(planeDetails.getModel());
        plane.setManufacturer(planeDetails.getManufacturer());
        plane.setSeatCapacity(planeDetails.getSeatCapacity());

        return planeRepository.save(plane);
    }

    public void deletePlane(Long id) {
        Plane plane = getPlaneById(id);
        planeRepository.delete(plane);
    }
}
