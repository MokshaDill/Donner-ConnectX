package com.springbootcrud.campmgtservice.service.impl;

import com.springbootcrud.campmgtservice.entity.Camp;
import com.springbootcrud.campmgtservice.repository.CampRepository;
import com.springbootcrud.campmgtservice.service.ApprovalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ApprovalServiceImpl implements ApprovalService {

    @Autowired
    private CampRepository campRepository;

    @Override
    public Camp approveCamp(Long campId) {
        Camp camp = campRepository.findById(campId)
                .orElseThrow(() -> new RuntimeException("Camp not found"));
        camp.setApproved(true);
        return campRepository.save(camp);
    }
}
