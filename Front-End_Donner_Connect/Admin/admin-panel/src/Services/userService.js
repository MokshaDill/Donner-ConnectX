// src/services/userService.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/user'; // Update with your backend URL

export const getAllUsers = () => axios.get(`${API_URL}/all`);

export const createUser = (user) => axios.post(`${API_URL}/create`, user);

export const updateUser = (id, user) => axios.put(`${API_URL}/update/${id}`, user);

export const deleteUser = (id) => axios.delete(`${API_URL}/delete/${id}`);
