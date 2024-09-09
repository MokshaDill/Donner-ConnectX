package com.springbootcrud.authenticationservice.entity;

public class AuthenticationResponse {

    private String token;
    private int userId; // Add user ID (or String if you're using UUID)

    /**
     * Constructor
     * @param token
     * @param userId
     */
    public AuthenticationResponse(String token, int userId) {
        this.token = token;
        this.userId = userId;
    }

    // Getter for token
    public String getToken() {
        return token;
    }

    // Getter for userId
    public int getUserId() {
        return userId;
    }

    // You can add more fields like username if needed
}
