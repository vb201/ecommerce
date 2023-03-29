package com.ecommerce.backend.services;

import java.util.List;

import com.ecommerce.backend.model.Product;

public interface ProductService {
    List<Product> getAllProducts();
    Product getProductById(Long id);
    Product createProduct(Product product);
}