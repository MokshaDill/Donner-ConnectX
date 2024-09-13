package com.springbootcrud.userservice.repository;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Map;

@Repository
public class DonationRepository {

    private final JdbcTemplate jdbcTemplate;

    public DonationRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /**
     *
     * @param userId id of the user
     * @return donation data of the given user
     */
    public List<Map<String, Object>> findDonationsByUserId(Long userId) {
        String query = "SELECT * FROM donation WHERE id = ?";
        return jdbcTemplate.queryForList(query, userId);
    }
}

