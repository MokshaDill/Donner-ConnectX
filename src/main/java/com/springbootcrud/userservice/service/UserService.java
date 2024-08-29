package com.springbootcrud.userservice.service;

import com.springbootcrud.userservice.entity.User;

import java.util.List;

public interface UserService {
    User registerUser(User user);
    User updateUser(Long id, User user);
    User getUserById(Long id);
    void deleteUser(Long id);
    List<String> getDonationHistory(Long userId);

    List<User> getAllUsers();
}






