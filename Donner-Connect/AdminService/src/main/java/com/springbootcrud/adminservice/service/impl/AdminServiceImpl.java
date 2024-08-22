package com.springbootcrud.adminservice.service.impl;

import com.springbootcrud.adminservice.entity.Admin;
import com.springbootcrud.adminservice.repository.AdminRepository;
import com.springbootcrud.adminservice.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class AdminServiceImpl implements AdminService {

    @Autowired
    private AdminRepository adminRepository;

    @Override
    public Admin addAdmin(Admin admin) {
        return adminRepository.save(admin);
    }
}
