import React, { useState, useEffect } from 'react';
import { User } from '../auth/users';
import { Role } from '../auth/roles';
import { userService } from '../services/userService';

const AdminPage = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [roles, setRoles] = useState<Role[]>([]);
    const [newUser, setNewUser] = useState({ name: '', email: '', roleId: '' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            const fetchedUsers = await userService.getUsers();
            const fetchedRoles = await userService.getRoles();
            setUsers(fetchedUsers);
            setRoles(fetchedRoles);
            setLoading(false);
        };
        fetchData();
    }, []);

    const handleAddUser = async () => {
        await userService.createUser(newUser);
        setNewUser({ name: '', email: '', roleId: '' });
        const updatedUsers = await userService.getUsers();
        setUsers(updatedUsers);
    };

    const handleDeleteUser = async (userId: string) => {
        await userService.deleteUser(userId);
        const updatedUsers = await userService.getUsers();
        setUsers(updatedUsers);
    };

    return (
        <div>
            <h1>Admin Panel</h1>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <>
                    <h2>Users</h2>
                    <ul>
                        {users.map(user => (
                            <li key={user.id}>
                                {user.name} - {user.email}
                                <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                            </li>
                        ))}
                    </ul>
                    <h2>Add User</h2>
                    <input
                        type="text"
                        placeholder="Name"
                        value={newUser.name}
                        onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={newUser.email}
                        onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    />
                    <select
                        value={newUser.roleId}
                        onChange={(e) => setNewUser({ ...newUser, roleId: e.target.value })}
                    >
                        <option value="">Select Role</option>
                        {roles.map(role => (
                            <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                    </select>
                    <button onClick={handleAddUser}>Add User</button>
                </>
            )}
        </div>
    );
};

export default AdminPage;