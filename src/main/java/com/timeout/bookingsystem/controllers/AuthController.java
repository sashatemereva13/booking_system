package com.timeout.bookingsystem.controllers;

import com.timeout.bookingsystem.dto.AuthResponse;
import com.timeout.bookingsystem.dto.LoginRequest;
import com.timeout.bookingsystem.models.User;
import com.timeout.bookingsystem.services.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }


    @PostMapping("/register")
    public void register(@RequestBody User user) {
        authService.register(user);
    }

    @PostMapping("/login")
    public AuthResponse login(@RequestBody LoginRequest request) {
        String token = authService.login(
                request.getEmail(),
                request.getPassword()
        );
        return new AuthResponse(token);
    }
}
