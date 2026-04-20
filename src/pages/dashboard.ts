import React, { useEffect, useState } from 'react';
import { User } from '../auth/users';
import { Role } from '../auth/roles';
import { getCurrentUser } from '../services/authService';

const Dashboard: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [roles, setRoles] = useState<Role[]>([]);

    useEffect(() => {
        const currentUser = getCurrentUser();
        if (currentUser) {
            setUser(currentUser);
            setRoles(currentUser.roles); // Assuming roles are part of the User object
        }
    }, []);

    return (
        <div>
            <h1>Dashboard</h1>
            {user ? (
                <div>
                    <h2>Welcome, {user.name}!</h2>
                    <h3>Your Roles:</h3>
                    <ul>
                        {roles.map(role => (
                            <li key={role.id}>{role.name}</li>
                        ))}
                    </ul>
                </div>
            ) : (
                <p>Please log in to see your dashboard.</p>
            )}
        </div>
    );
};

export default Dashboard;