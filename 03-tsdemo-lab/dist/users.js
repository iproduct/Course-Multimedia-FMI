export var Role;
(function (Role) {
    Role[Role["CUSTOMER"] = 1] = "CUSTOMER";
    Role[Role["MANAGER"] = 2] = "MANAGER";
    Role[Role["ADMIN"] = 4] = "ADMIN";
})(Role || (Role = {}));
export class UserImpl {
    constructor(id, firstName, lastName, email, password, roles, contact) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.roles = roles;
        this.contact = contact;
    }
    get salutation() {
        return `Hello ${this.firstName} ${this.lastName}, in roles: ${this.roles.map(r => Role[r])}`;
    }
}
export class Customer extends UserImpl {
    constructor(id, firstName, lastName, email, password, contact) {
        super(id, firstName, lastName, email, password, [Role.CUSTOMER], contact);
    }
}
export class Manager extends UserImpl {
    constructor(id, firstName, lastName, email, password, contact) {
        super(id, firstName, lastName, email, password, [Role.MANAGER], contact);
    }
}
export class Admin extends UserImpl {
    constructor(id, firstName, lastName, email, password, contact) {
        super(id, firstName, lastName, email, password, [Role.ADMIN], contact);
    }
}
//# sourceMappingURL=users.js.map