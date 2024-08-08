package com.springbootcrud.adminservice.controller;


import com.springbootcrud.adminservice.DTO.AdminDTO;
import com.springbootcrud.adminservice.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "admin/create")
@CrossOrigin
public class AdminCreationController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/regadmin")
    public AdminDTO createAdmin(@RequestBody AdminDTO adminDTO) {
        return adminService.addAdmin(adminDTO);
    }
}
