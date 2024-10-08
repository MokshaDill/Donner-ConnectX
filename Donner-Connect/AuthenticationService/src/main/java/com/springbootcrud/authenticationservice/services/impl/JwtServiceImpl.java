package com.springbootcrud.authenticationservice.services.impl;

import com.springbootcrud.authenticationservice.entity.User;
import com.springbootcrud.authenticationservice.services.JwtService;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtServiceImpl implements JwtService {
        private final String SECRET_KEY = "f3fb129017f66e529886c76bce9878681f9621d89bff44004d11e2e0ba6af14f";

    /**
     *
     * @param token
     * @param user
     * @return
     */
    public boolean isValid(String token, UserDetails user) {
        String username = extractUsername(token);
        return (username.equals(user.getUsername())) && !isTokenExpired(token);
    }

    /**
     *
     * @param token
     * @return
     */
    public boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    /**
     *
     * @param token
     * @return
     */
    public Date extractExpiration(String token) {
        return extractClaims(token, Claims::getExpiration);
    }

    /**
     *
     * @param token
     * @return
     */
    public String extractUsername(String token) {
        return extractClaims(token, Claims::getSubject);
    }

    /**
     *
     * @param token
     * @param resolver
     * @return
     * @param <T>
     */
    public <T> T extractClaims(String token, Function<Claims, T> resolver ) {
        Claims claims = extractClaims(token);
        return resolver.apply(claims);
    }

    /**
     *
     * @param token
     * @return
     */
    public Claims extractClaims(String token) {
        return  Jwts
                .parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    /**
     *
     * @param user
     * @return
     */
    public String generateToken(User user) {
        String token = Jwts
                .builder()
                .subject(user.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis()+ 24*60*60*1000 ))
                .signWith(getSigningKey())
                .compact();

        return token;
    }

    /**
     *
     * @return
     */
    public SecretKey getSigningKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
