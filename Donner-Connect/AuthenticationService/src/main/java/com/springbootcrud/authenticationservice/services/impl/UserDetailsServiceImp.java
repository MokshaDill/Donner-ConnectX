package com.springbootcrud.authenticationservice.services.impl;

import com.springbootcrud.authenticationservice.entity.User;
import com.springbootcrud.authenticationservice.repository.UserRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsServiceImp implements UserDetailsService {

    @Autowired
    private final UserRepository userRepository;

    @Autowired
    // private ModelMapper modelMapper;

    /**
     *
     * @param userRepository
     */
    public UserDetailsServiceImp(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    /**
     *
     * @param username
     * @return
     * @throws UsernameNotFoundException
     */
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return userRepository.findByUsername(username).
                orElseThrow(()-> new UsernameNotFoundException("User not  found"));
    }

//    public User updateCustomer(User user){
//        userRepository.save(modelMapper.map(user, User.class));
//        return user;
//    }


}
