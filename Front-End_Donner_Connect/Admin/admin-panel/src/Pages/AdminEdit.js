import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function AdminEdit() {
  const { id } = useParams();
  const [admin, setAdmin] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch the admin data based on ID
    // adminService.getAdminById(id).then(setAdmin);
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your service to update the admin
    // adminService.updateAdmin(id, admin).then(() => navigate('/admin/list'));
  };

  return (
    <div>
      <h1>Edit Admin</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={admin.name}
          onChange={handleChange}
          placeholder="Name"
        />
        <input
          type="email"
          name="email"
          value={admin.email}
          onChange={handleChange}
          placeholder="Email"
        />
        <button type="submit">Update</button>
      </form>
    </div>
  );
}

export default AdminEdit;
