package com.springbootcrud.authenticationservice.controller;

import com.springbootcrud.authenticationservice.entity.AuthenticationResponse;
import com.springbootcrud.authenticationservice.entity.Contributor;
import com.springbootcrud.authenticationservice.entity.User;
import com.springbootcrud.authenticationservice.services.AuthenticationService;
import com.springbootcrud.authenticationservice.services.ContributorService;
import com.springbootcrud.authenticationservice.services.impl.UserDetailsServiceImp;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class AuthenticationController {

    private final AuthenticationService authenticationService;
    private final ContributorService contributorService;
    @Autowired
    private UserDetailsServiceImp userDetailsServiceImp;

    /**
     * constructor
     * @param authenticationService
     */
    public AuthenticationController(AuthenticationService authenticationService, ContributorService contributorService) {
        this.authenticationService = authenticationService;
        this.contributorService = contributorService;
    }

    /**
     *
     * @param request
     * @return
     */
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody User request){
        return ResponseEntity.ok(authenticationService.register(request));
    }

    /**
     *
     * @param request
     * @return
     */
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody User request){
        return ResponseEntity.ok(authenticationService.authenticate(request));
    }

    @PostMapping("/getUserIDByEmailAndPassword")
    public String getUserIDByEmailAndPassword(@RequestBody Contributor request){
        return Integer.toString(contributorService.GetUserContributorFromEmail(request.getEmail(),request.getPassword())) ;
    }

//    @GetMapping("/getUserByEmailAndPassword/{email}/{password}")
//    public int getUserByEmailAndPassword(@PathVariable String email, @PathVariable String password){
//        var i = contributorService.GetUserContributorFromEmail(email,password);
//        if (i>0){
//            return (contributorService.GetUserContributorFromEmail(email,password));
//        }
//        else
//            return 0;
//    }

//    @PutMapping("/updateCustomer")
//    public UserDetails updateCustomer(@RequestBody User request){
//        return userDetailsServiceImp.updateCustomer(request);
//    }
}
