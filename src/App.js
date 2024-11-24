import React, { useState } from 'react';
import { X, Plus, Edit2, Trash2, Check, Users, Shield, Key } from 'lucide-react';

// Mock initial data
const initialUsers = [
  { id: 1, name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'active' },
  { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'editor', status: 'active' },
];

const initialRoles = [
  { id: 1, name: 'admin', permissions: ['read', 'write', 'delete'] },
  { id: 2, name: 'editor', permissions: ['read', 'write'] },
  { id: 3, name: 'viewer', permissions: ['read'] },
];

const allPermissions = ['read', 'write', 'delete', 'manage_users', 'manage_roles'];

const Dashboard = () => {
  const [users, setUsers] = useState(initialUsers);
  const [roles, setRoles] = useState(initialRoles);
  const [activeTab, setActiveTab] = useState('users');
  const [editingUser, setEditingUser] = useState(null);
  const [editingRole, setEditingRole] = useState(null);
  
  // User Management Functions
  const addUser = (user) => {
    setUsers([...users, { ...user, id: users.length + 1 }]);
  };

  const updateUser = (updatedUser) => {
    setUsers(users.map(user => user.id === updatedUser.id ? updatedUser : user));
  };

  const deleteUser = (userId) => {
    setUsers(users.filter(user => user.id !== userId));
  };

  // Role Management Functions
  const addRole = (role) => {
    setRoles([...roles, { ...role, id: roles.length + 1 }]);
  };

  const updateRole = (updatedRole) => {
    setRoles(roles.map(role => role.id === updatedRole.id ? updatedRole : role));
  };

  const deleteRole = (roleId) => {
    setRoles(roles.filter(role => role.id !== roleId));
  };

  // User Form Component
  const UserForm = ({ user, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(user || { name: '', email: '', role: 'viewer', status: 'active' });

    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">{user ? 'Edit User' : 'Add User'}</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}>
          <div className="space-y-4">
            <input
              className="w-full p-2 border rounded"
              placeholder="Name"
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
            <input
              className="w-full p-2 border rounded"
              placeholder="Email"
              value={formData.email}
              onChange={e => setFormData({...formData, email: e.target.value})}
            />
            <select
              className="w-full p-2 border rounded"
              value={formData.role}
              onChange={e => setFormData({...formData, role: e.target.value})}
            >
              {roles.map(role => (
                <option key={role.id} value={role.name}>{role.name}</option>
              ))}
            </select>
            <select
              className="w-full p-2 border rounded"
              value={formData.status}
              onChange={e => setFormData({...formData, status: e.target.value})}
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
          <div className="mt-4 flex space-x-2">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              {user ? 'Update' : 'Add'}
            </button>
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  // Role Form Component
  const RoleForm = ({ role, onSubmit, onCancel }) => {
    const [formData, setFormData] = useState(role || { name: '', permissions: [] });

    const togglePermission = (permission) => {
      const newPermissions = formData.permissions.includes(permission)
        ? formData.permissions.filter(p => p !== permission)
        : [...formData.permissions, permission];
      setFormData({ ...formData, permissions: newPermissions });
    };

    return (
      <div className="p-4 bg-white rounded-lg shadow">
        <h3 className="text-lg font-medium mb-4">{role ? 'Edit Role' : 'Add Role'}</h3>
        <form onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData);
        }}>
          <input
            className="w-full p-2 border rounded mb-4"
            placeholder="Role Name"
            value={formData.name}
            onChange={e => setFormData({...formData, name: e.target.value})}
          />
          <div className="space-y-2">
            <h4 className="font-medium">Permissions:</h4>
            {allPermissions.map(permission => (
              <label key={permission} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={formData.permissions.includes(permission)}
                  onChange={() => togglePermission(permission)}
                />
                <span>{permission}</span>
              </label>
            ))}
          </div>
          <div className="mt-4 flex space-x-2">
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
              {role ? 'Update' : 'Add'}
            </button>
            <button type="button" onClick={onCancel} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">
              Cancel
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>
        
        {/* Navigation Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('users')}
            className={`flex items-center space-x-2 px-4 py-2 rounded ${activeTab === 'users' ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            <Users size={20} />
            <span>Users</span>
          </button>
          <button
            onClick={() => setActiveTab('roles')}
            className={`flex items-center space-x-2 px-4 py-2 rounded ${activeTab === 'roles' ? 'bg-blue-500 text-white' : 'bg-white'}`}
          >
            <Shield size={20} />
            <span>Roles</span>
          </button>
        </div>

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Users</h2>
              <button
                onClick={() => setEditingUser({})}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <Plus size={20} />
                <span>Add User</span>
              </button>
            </div>
            
            {editingUser && (
              <UserForm
                user={editingUser.id ? editingUser : null}
                onSubmit={(userData) => {
                  if (userData.id) {
                    updateUser(userData);
                  } else {
                    addUser(userData);
                  }
                  setEditingUser(null);
                }}
                onCancel={() => setEditingUser(null)}
              />
            )}

            <div className="mt-4">
              <table className="min-w-full">
                <thead>
                  <tr>
                    <th className="text-left p-2">Name</th>
                    <th className="text-left p-2">Email</th>
                    <th className="text-left p-2">Role</th>
                    <th className="text-left p-2">Status</th>
                    <th className="text-left p-2">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map(user => (
                    <tr key={user.id} className="border-t">
                      <td className="p-2">{user.name}</td>
                      <td className="p-2">{user.email}</td>
                      <td className="p-2">{user.role}</td>
                      <td className="p-2">
                        <span className={`px-2 py-1 rounded text-sm ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="p-2">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => setEditingUser(user)}
                            className="p-1 text-blue-500 hover:text-blue-700"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Roles Tab */}
        {activeTab === 'roles' && (
          <div className="bg-white rounded-lg p-6 shadow">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Roles</h2>
              <button
                onClick={() => setEditingRole({})}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                <Plus size={20} />
                <span>Add Role</span>
              </button>
            </div>

            {editingRole && (
              <RoleForm
                role={editingRole.id ? editingRole : null}
                onSubmit={(roleData) => {
                  if (roleData.id) {
                    updateRole(roleData);
                  } else {
                    addRole(roleData);
                  }
                  setEditingRole(null);
                }}
                onCancel={() => setEditingRole(null)}
              />
            )}

            <div className="mt-4 grid gap-4">
              {roles.map(role => (
                <div key={role.id} className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-medium">{role.name}</h3>
                      <div className="mt-2 flex flex-wrap gap-2">
                        {role.permissions.map(permission => (
                          <span key={permission} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                            {permission}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => setEditingRole(role)}
                        className="p-1 text-blue-500 hover:text-blue-700"
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => deleteRole(role.id)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;