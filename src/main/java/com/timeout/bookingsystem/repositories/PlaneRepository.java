package com.timeout.bookingsystem.repositories;

import com.timeout.bookingsystem.models.Plane;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaneRepository extends JpaRepository<Plane, Long>{
}
