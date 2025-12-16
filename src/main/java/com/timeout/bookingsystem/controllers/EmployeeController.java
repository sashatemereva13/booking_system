package com.timeout.bookingsystem.controllers;

import com.timeout.bookingsystem.models.Employee;
import com.timeout.bookingsystem.repositories.EmployeeRepository;
import com.timeout.bookingsystem.repositories.UserRepository;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/employees")
public class EmployeeController {

    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;

    public EmployeeController(EmployeeRepository employeeRepository,
                              UserRepository userRepository) {
        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository;
    }

    // GET ALL
    @GetMapping
    public List<Employee> getAllEmployees() {
        return employeeRepository.findAll();
    }

    // GET ONE
    @GetMapping("/{id}")
    public Employee getEmployee(@PathVariable Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Employee not found"));
    }

    @PostMapping
    public Employee createEmployee(@RequestBody Employee employee) {
        try {
            return employeeRepository.save(employee);
        } catch (DataIntegrityViolationException e) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Email already exists");
        }
    }

    @PostMapping("/from-user/{userId}")
    public Employee createEmployeeFromUser(
            @PathVariable Long userId,
            @RequestBody Employee body
    ) {
        // проверяем, что User существует
        userRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "User not found"));

        Employee e = new Employee();
        e.setFirstName(body.getFirstName());
        e.setLastName(body.getLastName());
        e.setEmail(body.getEmail());
        e.setRole(body.getRole());
        e.setUserId(userId);

        try {
            return employeeRepository.save(e);
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Email already exists");
        }
    }

    @PutMapping("/{id}")
    public Employee updateEmployee(@PathVariable Long id,
                                   @RequestBody Employee updated) {

        Employee e = employeeRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Employee not found"));

        e.setFirstName(updated.getFirstName());
        e.setLastName(updated.getLastName());
        e.setEmail(updated.getEmail());
        e.setRole(updated.getRole());

        try {
            return employeeRepository.save(e);
        } catch (DataIntegrityViolationException ex) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Email already exists");
        }
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteEmployee(@PathVariable Long id) {
        if (!employeeRepository.existsById(id)) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Employee not found");
        }
        employeeRepository.deleteById(id);
    }
}
