package com.ecommerce.backend.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.ecommerce.backend.model.Order;

public interface OrderService {
    List<Order> getAllOrders();

    Order getOrderById(Long orderId);

    ResponseEntity<String> createOrder(List<Order> order, String authToken);

    List<Order> getOrdersByUserAuthToken(String authToken, String status);
}