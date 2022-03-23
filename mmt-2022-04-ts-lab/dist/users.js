export var Role;
(function (Role) {
    Role[Role["READER"] = 1] = "READER";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
    Role[Role["ADMIN"] = 3] = "ADMIN";
})(Role || (Role = {}));
export class UserBase {
    constructor(id, firstName, lastName, email, password, roles = [], contact) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.contact = contact;
    }
    get salutation() {
        return this.getSalutation();
    }
    getSalutation() {
        return `Hi ${this.firstName} ${this.lastName} in roles: ${this.roles.map(r => Role[r]).join(", ")}`;
    }
}
//# sourceMappingURL=users.js.map