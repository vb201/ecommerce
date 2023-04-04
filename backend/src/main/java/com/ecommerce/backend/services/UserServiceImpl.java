package com.ecommerce.backend.services;

import org.springframework.http.HttpHeaders;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ecommerce.backend.helper.GenerateToken;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public User getUserByAuthToken(String authToken) {
        User existingUser = userRepository.findByAuthToken(authToken);

        if (existingUser == null) {
            return null;
        }
        return existingUser;
    }

    public User createUser(User user) {
        user.setUserPassword(passwordEncoder.encode(user.getUserPassword()));
        return userRepository.save(user);
    }

    public ResponseEntity login(User user, HttpServletRequest request,
            HttpServletResponse response) {

        User exisingUser = userRepository.findByUserEmail(user.getUserEmail());
        // Check if the username and password are valid

        if (exisingUser == null) {
            System.out.println(exisingUser);
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Invalid username or password");
        }
        if (passwordEncoder.matches(user.getUserPassword(), exisingUser.getUserPassword())) {
            GenerateToken generateToken = new GenerateToken();
            exisingUser.setAuthToken(generateToken.generateToken());
            userRepository.save(exisingUser); // save changes to the existing user

            HttpHeaders headers = new HttpHeaders();
            headers.add("Authorization", "Bearer " + exisingUser.getAuthToken());
            headers.add("Access-Control-Expose-Headers", "Authorization");
            return ResponseEntity.ok()
                    .headers(headers)
                    .body("Logged in successfully");
        } else {

            return ResponseEntity.status(HttpStatus.FORBIDDEN).body("Invalid username or password");
        }
    }

}
