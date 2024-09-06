// src/pages/AdminList.js
import React, { useEffect, useState } from 'react';
import { getAllAdmins, deleteAdmin } from '../Services/adminService';
import { Link } from 'react-router-dom';
import './AdminList.css';

const AdminList = () => {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        fetchAdmins();
    }, []);

    const fetchAdmins = async () => {
        try {
            const response = await getAllAdmins();
            setAdmins(response.data);
        } catch (error) {
            console.error('Error fetching admins:', error);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this admin?')) {
            try {
                await deleteAdmin(id);
                fetchAdmins();
            } catch (error) {
                console.error('Error deleting admin:', error);
            }
        }
    };

    return (
        <div className="admin-list">
            <h2>Admins</h2>
            <Link to="/admins/create" className="create-button">Create New Admin</Link>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {admins.map(admin => (
                        <tr key={admin.id}>
                            <td>{admin.id}</td>
                            <td>{admin.name}</td>
                            <td>{admin.email}</td>
                            <td>
                                <Link to={`/admins/edit/${admin.id}`} className="edit-button">Edit</Link>
                                <button onClick={() => handleDelete(admin.id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default AdminList;
