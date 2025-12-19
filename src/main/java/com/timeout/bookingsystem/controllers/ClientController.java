package com.timeout.bookingsystem.controllers;

import com.timeout.bookingsystem.models.Client;
import com.timeout.bookingsystem.services.ClientService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/clients")
@CrossOrigin
public class ClientController {

    private final ClientService clientService;

    public ClientController(ClientService clientService) {
        this.clientService = clientService;
    }


    @GetMapping("/email/{email}")
    public Client getClientByEmail(@PathVariable String email) {
        return clientService.getClientByEmail(email);
    }


    @GetMapping
    public List<Client> getAllClients() {
        return clientService.getAllClients();
    }


    @PostMapping
    public Client createClient(@RequestBody Client client) {
        return clientService.createClient(client);
    }


    @DeleteMapping("/{passportNumber}")
    public void deleteClient(@PathVariable Long id) {
        clientService.deleteClient(id);
    }
}
