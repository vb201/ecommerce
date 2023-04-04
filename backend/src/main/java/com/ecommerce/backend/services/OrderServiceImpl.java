package com.ecommerce.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import com.ecommerce.backend.model.Order;
import com.ecommerce.backend.model.Product;
import com.ecommerce.backend.model.User;
import com.ecommerce.backend.repository.OrderRepository;
import com.ecommerce.backend.repository.ProductRepository;
import com.ecommerce.backend.repository.UserRepository;

import jakarta.persistence.EntityNotFoundException;

@Service
public class OrderServiceImpl implements OrderService {
    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ProductRepository productRepository;

    @Override
    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }

    @Override
    public Order getOrderById(Long orderId) {
        return orderRepository.findById(orderId)
                .orElseThrow(() -> new EntityNotFoundException("Order not found with id: " + orderId));
    }

    @Override
    public ResponseEntity<String> createOrder(List<Order> order, String authToken) {

        User existingUser = userRepository.findByAuthToken(authToken);

        if (existingUser == null) {
            return null;
        }

        existingUser.setUserBillingAddress(order.get(0).getBillingAddress());
        existingUser.setUserShippingAddress(order.get(0).getShippingAddress());
        userRepository.save(existingUser);

        for (Order o : order) {
            Product existingProduct = productRepository.findByProductId(o.getProduct().getProductId());

            if (existingProduct == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body("Product not found with id: " + o.getProduct().getProductId());
            }

            o.setProduct(existingProduct);
            o.setUser(existingUser);
            orderRepository.save(o);
        }

        return ResponseEntity.status(HttpStatus.CREATED).body("Order created successfully");
    }

    @Override
    public List<Order> getOrdersByUserAuthToken(String authToken, String status) {
        List<Order> orders = orderRepository.findByUserAuthToken(authToken);

        if (status.equals("all")) {
            return orders;
        }

        List<Order> pendingOrders = orders.stream().filter(o -> o.getOrderStatus().equals(status))
                .collect(Collectors.toList());

        return pendingOrders;
    }
}
