package com.springbootcrud.adminservice.controller;

import com.springbootcrud.adminservice.entity.Admin;
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
    public Admin createAdmin(@RequestBody Admin admin) {
        return adminService.addAdmin(admin);
    }
}
