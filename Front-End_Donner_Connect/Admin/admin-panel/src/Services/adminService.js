// src/services/adminService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/admin'; // Update with your backend URL

export const getAllAdmins = () => axios.get(`${API_URL}/all`);

export const getAdminById = (id) => axios.get(`${API_URL}/${id}`);

export const createAdmin = (admin) => axios.post(`${API_URL}/create`, admin);

export const updateAdmin = (id, admin) => axios.put(`${API_URL}/update/${id}`, admin);

export const deleteAdmin = (id) => axios.delete(`${API_URL}/delete/${id}`);
