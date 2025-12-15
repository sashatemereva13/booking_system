package com.timeout.bookingsystem.services;

import com.timeout.bookingsystem.models.User;
import com.timeout.bookingsystem.repositories.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserById(Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("User not found with id: " + id));
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public User updateUser(Long id, User user) {
        User existing = getUserById(id);

        existing.setFirstName(user.getFirstName());
        existing.setLastName(user.getLastName());
        existing.setAddress(user.getAddress());
        existing.setEmail(user.getEmail());
        existing.setPhone(user.getPhone());
        existing.setBirthdate(user.getBirthdate());

        return userRepository.save(existing);
    }

    public void deleteUser(Long id) {
        User user = getUserById(id);
        userRepository.delete(user);
    }
}
