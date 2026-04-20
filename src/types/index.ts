export interface User {
    id: string;
    name: string;
    email: string;
}

export interface Role {
    id: string;
    name: string;
}

export interface UserRoleAssignment {
    userId: string;
    roleId: string;
}