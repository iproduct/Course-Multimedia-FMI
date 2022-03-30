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
export class Reader extends UserBase {
    constructor(id, firstName, lastName, email, password, contact, roles = [Role.READER]) {
        super(id, firstName, lastName, email, password, roles, contact);
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.contact = contact;
        this.roles = roles;
    }
    toString() {
        return `Reader{name: ${this.firstName} ${this.lastName}, roles: ${this.roles.map(r => Role[r]).join(", ")}, email: ${this.email}, password: ${this.password}}`;
    }
}
export class Author extends UserBase {
    constructor(id, firstName, lastName, email, password, contact, roles = [Role.AUTHOR]) {
        super(id, firstName, lastName, email, password, roles, contact);
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.contact = contact;
        this.roles = roles;
    }
    toString() {
        return `Author{name: ${this.firstName} ${this.lastName}, roles: ${this.roles.map(r => Role[r]).join(", ")}, email: ${this.email}, password: ${this.password}}`;
    }
}
export class Admin extends UserBase {
    constructor(id, firstName, lastName, email, password, contact, roles = [Role.ADMIN]) {
        super(id, firstName, lastName, email, password, roles, contact);
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.contact = contact;
        this.roles = roles;
    }
    toString() {
        return `Admin{name: ${this.firstName} ${this.lastName}, roles: ${this.roles.map(r => Role[r]).join(", ")}, email: ${this.email}, password: ${this.password}}`;
    }
}
//# sourceMappingURL=users.js.map