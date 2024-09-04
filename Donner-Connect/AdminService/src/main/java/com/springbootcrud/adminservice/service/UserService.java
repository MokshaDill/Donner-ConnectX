package com.springbootcrud.adminservice.service;

import com.springbootcrud.adminservice.entity.User;

import java.util.List;

public interface UserService {
    User createUser(User user);
    User updateUser(int id, User user);
    void deleteUser(int id);
    List<User> getAllUsers();
}
