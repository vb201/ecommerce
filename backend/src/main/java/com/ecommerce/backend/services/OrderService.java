package com.ecommerce.backend.services;

import java.util.List;

import org.springframework.http.ResponseEntity;

import com.ecommerce.backend.model.Order;

public interface OrderService {
    List<Order> getAllOrders();
    Order getOrderById(Long orderId);
    ResponseEntity<String> createOrder(Order order);
    List<Order> getOrdersByUserId(Long userId);
}