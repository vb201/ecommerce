package com.ecommerce.backend.services;

import org.springframework.http.ResponseEntity;

import com.ecommerce.backend.model.User;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public interface UserService {

	User getUserByAuthToken(String authToken);

	User createUser(User user);

	ResponseEntity login(User user, HttpServletRequest request,
			HttpServletResponse response);
}
