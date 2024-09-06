import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminCreate() {
  const [admin, setAdmin] = useState({ name: '', email: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin({ ...admin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call your service to create an admin
    // adminService.createAdmin(admin).then(() => navigate('/admin/list'));
  };

  return (
    <div>
      <h1>Create Admin</h1>
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
        <button type="submit">Create</button>
      </form>
    </div>
  );
}

export default AdminCreate;
