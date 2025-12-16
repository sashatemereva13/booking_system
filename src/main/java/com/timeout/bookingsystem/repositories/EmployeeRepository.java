package com.timeout.bookingsystem.repositories;

import com.timeout.bookingsystem.models.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
