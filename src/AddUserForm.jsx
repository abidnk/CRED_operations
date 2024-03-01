import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from './userSlice';

function AddUserForm() {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({ email: '', first_name: '', last_name: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    setFormData({ email: '', first_name: '', last_name: '' });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" />
      <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} placeholder="First Name" />
      <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Last Name" />
      <button type="submit">Add User</button>
    </form>
  );
}

export default AddUserForm;