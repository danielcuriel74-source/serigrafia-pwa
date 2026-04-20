export class Role {
    constructor(public id: number, public name: string) {}

    static assignRoleToUser(userId: number, roleId: number): string {
        // Logic to assign a role to a user
        return `Role ${roleId} assigned to user ${userId}`;
    }

    static getRoles(): Role[] {
        // Logic to retrieve available roles
        return [
            new Role(1, 'admin'),
            new Role(2, 'editor'),
            new Role(3, 'op'),
        ];
    }
}