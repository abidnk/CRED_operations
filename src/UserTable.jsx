import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteUser,updateUser } from './userSlice';

function UserTable({ users }) {
  const dispatch = useDispatch();
  const [editUser, setEditUser] = useState(null);
  const [editedName, setEditedName] = useState('');
  const [editedEmail, setEditedEmail] = useState('');

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      dispatch(deleteUser(id));
    }
  };

  const handleEdit = (user) => {
    setEditUser(user);
    setEditedName(user.first_name);
    setEditedEmail(user.email);
  };

  const handleSaveEdit = () => {
    const updatedUser = { ...editUser, first_name: editedName, email: editedEmail };
    dispatch(updateUser(updatedUser));
    setEditUser(null);
  };

  return (
    <div>
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
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{`${user.first_name} ${user.last_name}`}</td>
              <td>{user.email}</td>
              <td>
                <button onClick={() => handleEdit(user)}>Edit</button>
                <button onClick={() => handleDelete(user.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Edit Modal */}
      {editUser && (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={() => setEditUser(null)}>&times;</span>
            <h2>Edit User</h2>
            <label>Name:</label>
            <input type="text" value={editedName} onChange={(e) => setEditedName(e.target.value)} />
            <label>Email:</label>
            <input type="text" value={editedEmail} onChange={(e) => setEditedEmail(e.target.value)} />
            <button onClick={handleSaveEdit}>Save</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default UserTable;
