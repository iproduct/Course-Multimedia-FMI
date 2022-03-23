export var Role;
(function (Role) {
    Role[Role["READER"] = 1] = "READER";
    Role[Role["AUTHOR"] = 2] = "AUTHOR";
    Role[Role["ADMIN"] = 3] = "ADMIN";
})(Role || (Role = {}));
export class UserBase {
    constructor(id, password, salutation, firstName, lastName, email, roles = [], contact) {
        this.id = id;
        this.password = password;
        this.salutation = salutation;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.roles = roles;
        this.contact = contact;
    }
    getSalutation() {
        return `Hi ${this.firstName} ${this.lastName} in roles: ${this.roles.map(r => Role[r]).join(", ")}`;
    }
}
//# sourceMappingURL=users.js.map