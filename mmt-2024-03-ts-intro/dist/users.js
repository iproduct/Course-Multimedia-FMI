export var Role;
(function (Role) {
    Role[Role["Author"] = 1] = "Author";
    Role[Role["Reader"] = 2] = "Reader";
    Role[Role["Admin"] = 3] = "Admin";
})(Role || (Role = {}));
export class UserBase {
    constructor(firstName, lastName, email, password, contact, roles = [Role.Reader], id) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.contact = contact;
        this.roles = roles;
        this.id = id;
    }
}
export class User extends UserBase {
    get salutation() {
        return `Hello ${this.firstName} ${this.lastName} [${this.email}] in roles: ${this.roles.map(r => Role[r]).join(', ')}`;
    }
}
//# sourceMappingURL=users.js.map