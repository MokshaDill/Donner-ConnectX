package com.springbootcrud.campmgtservice.service;

import com.springbootcrud.campmgtservice.entity.Camp;

public interface ApprovalService {
    Camp approveCamp(Long campId);
}
