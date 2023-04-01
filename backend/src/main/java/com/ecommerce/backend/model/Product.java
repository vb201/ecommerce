package com.ecommerce.backend.model;

import java.math.BigDecimal;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "products")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class Product {
	@Id
	@GeneratedValue
	private Long productId;

	@Column(nullable = false)
	private String productName;

	@Column(nullable = false)
	private String productDescription;

	@Column(nullable = false)
	private BigDecimal price;

	@Column(nullable = false)
	private String imageURI;

}
