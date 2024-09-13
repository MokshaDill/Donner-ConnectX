package com.springbootcrud.adminservice.controller;

import com.springbootcrud.adminservice.entity.User;
import com.springbootcrud.adminservice.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
@CrossOrigin  // Enables cross-origin requests to allow frontend applications from different domains to interact with this API
public class User_ad_Controller {

    @Autowired
    private UserService userService;  // Automatically injects the UserService to handle user-related operations

    /**
     * Endpoint to create a new user.
     *
     * @param user the User object to be created, provided in the request body.
     * @return the created User object with the generated ID.
     */
    @PostMapping("/create")
    public User createUser(@RequestBody User user) {
        return userService.createUser(user);  // Calls the service to save the user to the database
    }

    /**
     * Endpoint to update an existing user by their ID.
     *
     * @param id the ID of the user to update.
     * @param user the User object containing updated information, provided in the request body.
     * @return the updated User object.
     */
    @PutMapping("/update/{id}")
    public User updateUser(@PathVariable int id, @RequestBody User user) {
        return userService.updateUser(id, user);  // Updates the user with the given ID
    }

    /**
     * Endpoint to delete a user by their ID.
     *
     * @param id the ID of the user to be deleted.
     */
    @DeleteMapping("/delete/{id}")
    public void deleteUser(@PathVariable int id) {
        userService.deleteUser(id);  // Calls the service to delete the user from the database
    }

    /**
     * Endpoint to retrieve all users.
     *
     * @return a list of all User objects stored in the database.
     */
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userService.getAllUsers();  // Returns a list of all users from the service layer
    }
}
