package com.ecommerce.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ecommerce.backend.model.User;
import com.ecommerce.backend.services.UserService;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("api/users")
@CrossOrigin(origins = "*")
public class UserController {
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public User getUser(@RequestHeader("Authorization") String authorizationHeader) {
        String authToken = authorizationHeader.substring(7);

        return userService.getUserByAuthToken(authToken);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody User user, HttpServletRequest request,
            HttpServletResponse response) {
        return userService.login(user, request,
                response);
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return userService.createUser(user);
    }
}
