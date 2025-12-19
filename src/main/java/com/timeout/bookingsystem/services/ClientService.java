package com.timeout.bookingsystem.services;

import com.timeout.bookingsystem.models.Client;
import com.timeout.bookingsystem.repositories.ClientRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ClientService {

    private final ClientRepository clientRepository;

    public ClientService(ClientRepository clientRepository) {
        this.clientRepository = clientRepository;
    }


    public List<Client> getAllClients() {
        return clientRepository.findAll();
    }


    public Client getClientByEmail(String email) {
        return clientRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("Client not found with email: " + email)
                );
    }


    public Client createClient(Client client) {
        return clientRepository.save(client);
    }


    public void deleteClient(Long id) {
        Client client = clientRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Client not found with id: " + id)
                );
        clientRepository.delete(client);
    }

    // ✨ Miles logic (used by bookings)
    public void addMiles(String email, int miles) {
        Client client = getClientByEmail(email);
        client.addMiles(miles);
        clientRepository.save(client);
    }
}
