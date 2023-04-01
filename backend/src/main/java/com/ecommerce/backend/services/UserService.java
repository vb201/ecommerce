package com.ecommerce.backend.services;

import java.util.List;

import com.ecommerce.backend.model.User;

public interface UserService {
	List<User> getAllUsers();

	User getUserById(Long userId);

	User createUser(User user);

	User updateUser(Long userId, User user);

	void deleteUser(Long userId);

	Long login(User user);
}
