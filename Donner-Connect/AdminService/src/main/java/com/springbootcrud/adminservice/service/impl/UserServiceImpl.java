package com.springbootcrud.adminservice.service.impl;

import com.springbootcrud.adminservice.entity.User;
import com.springbootcrud.adminservice.repository.UserRepository;
import com.springbootcrud.adminservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public User createUser(User user) {
        return userRepository.save(user);
    }

    @Override
    public User updateUser(int id, User user) {
        Optional<User> optionalUser = userRepository.findById(id);
        if (optionalUser.isPresent()) {
            User existingUser = optionalUser.get();
            existingUser.setName(user.getName());
            existingUser.setEmail(user.getEmail());
            existingUser.setRole(user.getRole());
            return userRepository.save(existingUser);
        }
        throw new RuntimeException("User not found");
    }

    @Override
    public void deleteUser(int id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}
