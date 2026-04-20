import { User } from '../auth/users';
import { Role } from '../auth/roles';

let currentUser: User | null = null;

const users: User[] = [];
const roles: Role[] = [];

export const login = (email: string, password: string): boolean => {
    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        currentUser = user;
        return true;
    }
    return false;
};

export const logout = (): void => {
    currentUser = null;
};

export const isAuthenticated = (): boolean => {
    return currentUser !== null;
};

export const getCurrentUser = (): User | null => {
    return currentUser;
};

export const addUser = (user: User): void => {
    users.push(user);
};

export const assignRoleToUser = (userId: string, role: Role): void => {
    const user = users.find(user => user.id === userId);
    if (user) {
        user.roles.push(role);
    }
};