package com.springbootcrud.adminservice.service;

import com.springbootcrud.adminservice.DTO.AdminDTO;
import com.springbootcrud.adminservice.entity.Admin;
import com.springbootcrud.adminservice.repository.AdminRepo;
import jakarta.transaction.Transactional;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@Transactional
public class AdminService {
    @Autowired
    private AdminRepo adminRepo;

    @Autowired
    private ModelMapper modelMapper;

    public AdminDTO addAdmin(AdminDTO adminDTO) {
        Admin adminEntity = modelMapper.map(adminDTO, Admin.class);
        adminRepo.save(adminEntity);
        return adminDTO;
    }
}
