package com.springbootcrud.authenticationservice.services;

import com.springbootcrud.authenticationservice.entity.User;
import io.jsonwebtoken.Claims;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public interface JwtService {

    /**
     *
     * @param token
     * @param user
     * @return
     */
    boolean isValid(String token, UserDetails user);

    /**
     *
     * @param token
     * @return
     */
    boolean isTokenExpired(String token);

    /**
     *
     * @param token
     * @return
     */
    Date extractExpiration(String token);

    /**
     *
     * @param token
     * @return
     */
    String extractUsername(String token);

    /**
     *
     * @param token
     * @param resolver
     * @return
     * @param <T>
     */
    <T> T extractClaims(String token, Function<Claims, T> resolver );

    /**
     *
     * @param token
     * @return
     */
    Claims extractClaims(String token);

    /**
     *
     * @param user
     * @return
     */
    String generateToken(User user);

    /**
     *
     * @return
     */
    SecretKey getSigningKey();

}
