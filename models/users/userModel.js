class User {
    constructor(id, name, role, createdAt, password) {
        this.id = id;
        this.name = name;
        this.role = role;
        this.createdAt = createdAt;
        this.password = password;
    }

    getUserId() {
        return this.id;
    }

    getUser() {
        return ({
            id: this.id,
            name: this.name,
            role: this.role,
            createdAt: this.createdAt,
            password: this.password,
        })
    }
}

export default User;
