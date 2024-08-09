package com.springbootcrud.adminservice.repository;

import com.springbootcrud.adminservice.entity.Admin;
import org.springframework.data.repository.CrudRepository;

public interface AdminRepo extends CrudRepository<Admin, Integer> {
}
