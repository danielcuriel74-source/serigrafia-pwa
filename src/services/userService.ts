export interface User {
    id: string;
    name: string;
    email: string;
    roles: string[];
}

const users: User[] = [];

export const createUser = (name: string, email: string): User => {
    const newUser: User = {
        id: generateId(),
        name,
        email,
        roles: []
    };
    users.push(newUser);
    return newUser;
};

export const getUserById = (id: string): User | undefined => {
    return users.find(user => user.id === id);
};

export const updateUser = (id: string, updatedData: Partial<User>): User | undefined => {
    const user = getUserById(id);
    if (user) {
        Object.assign(user, updatedData);
        return user;
    }
    return undefined;
};

export const deleteUser = (id: string): boolean => {
    const index = users.findIndex(user => user.id === id);
    if (index !== -1) {
        users.splice(index, 1);
        return true;
    }
    return false;
};

export const assignRoleToUser = (userId: string, role: string): boolean => {
    const user = getUserById(userId);
    if (user && !user.roles.includes(role)) {
        user.roles.push(role);
        return true;
    }
    return false;
};

const generateId = (): string => {
    return Math.random().toString(36).substr(2, 9);
};