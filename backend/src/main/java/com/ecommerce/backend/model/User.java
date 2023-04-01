package com.ecommerce.backend.model;

import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "users")

public class User implements UserDetails {
	@Id
	@GeneratedValue
	private Long id;

	@Column(nullable = false)
	private String userName;

	@Column(nullable = false)
	private String userEmail;

	@Column(nullable = false)
	private String userPassword;

	@Enumerated(EnumType.STRING)
	private Role role;

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return List.of(new SimpleGrantedAuthority(role.name()));
	}

	@Override
	public String getPassword() {
		throw new UnsupportedOperationException("Unimplemented method 'getPassword'");
	}

	@Override
	public String getUsername() {
		throw new UnsupportedOperationException("Unimplemented method 'getUsername'");
	}

	@Override
	public boolean isAccountNonExpired() {
		throw new UnsupportedOperationException("Unimplemented method 'isAccountNonExpired'");
	}

	@Override
	public boolean isAccountNonLocked() {
		throw new UnsupportedOperationException("Unimplemented method 'isAccountNonLocked'");
	}

	@Override
	public boolean isCredentialsNonExpired() {
		throw new UnsupportedOperationException("Unimplemented method 'isCredentialsNonExpired'");
	}

	@Override
	public boolean isEnabled() {
		throw new UnsupportedOperationException("Unimplemented method 'isEnabled'");
	}

}
