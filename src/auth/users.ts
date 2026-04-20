class User {
    id: number;
    name: string;
    email: string;
    roles: string[];

    constructor(id: number, name: string, email: string) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.roles = [];
    }

    addRole(role: string) {
        if (!this.roles.includes(role)) {
            this.roles.push(role);
        }
    }

    removeRole(role: string) {
        this.roles = this.roles.filter(r => r !== role);
    }

    static createUser(id: number, name: string, email: string): User {
        return new User(id, name, email);
    }

    static getUserInfo(user: User): { id: number; name: string; email: string; roles: string[] } {
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            roles: user.roles
        };
    }
}

export default User;