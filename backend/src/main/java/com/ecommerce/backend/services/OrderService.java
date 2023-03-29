package com.ecommerce.backend.services;

import java.util.List;

import com.ecommerce.backend.model.Order;

public interface OrderService {
    List<Order> getAllOrders();
    Order getOrderById(Long id);
    Order createOrder(Order order);
}