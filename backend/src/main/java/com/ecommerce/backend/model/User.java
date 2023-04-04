package com.ecommerce.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor

public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	private String userName;

	@Column(nullable = false, unique = true)
	private String userEmail;

	@Column(nullable = false)
	private String userPassword;

	@Column(nullable = true)
	private String authToken;

	@Column
	private String userShippingAddress;

	@Column
	private String userBillingAddress;

}
