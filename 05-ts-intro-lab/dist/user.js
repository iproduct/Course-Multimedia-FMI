export var Role;
(function (Role) {
    Role[Role["AUTHOR"] = 1] = "AUTHOR";
    Role[Role["READER"] = 2] = "READER";
    Role[Role["ADMIN"] = 3] = "ADMIN";
})(Role || (Role = {}));
export class UserBase {
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
        return `${this.firstName} ${this.lastName} in roles: ${this.roles.map(role => Role[role]).join(', ')}`;
    }
    getSalutation() {
        return this.salutation;
    }
}
export class Author extends UserBase {
    constructor(id, firstName, lastName, email, password, roles = [], contact) {
        super(id, firstName, lastName, email, password, (roles.indexOf(Role.AUTHOR) >= 0 ? roles : [...roles, Role.AUTHOR]), contact);
    }
    // Overides method from base class
    getSalutation() {
        return `Author: ${super.getSalutation()}`;
    }
}
export class Reader extends UserBase {
    constructor(id, firstName, lastName, email, password, roles = [], contact) {
        super(id, firstName, lastName, email, password, (roles.indexOf(Role.READER) >= 0 ? roles : [...roles, Role.READER]), contact);
    }
    // Overides method from base class
    getSalutation() {
        return `Reader: ${super.getSalutation()}`;
    }
}
export class Admin extends UserBase {
    constructor(id, firstName, lastName, email, password, roles = [], contact) {
        super(id, firstName, lastName, email, password, (roles.indexOf(Role.ADMIN) >= 0 ? roles : [...roles, Role.ADMIN]), contact);
    }
    // Overides method from base class
    getSalutation() {
        return `Admin: ${super.getSalutation()}`;
    }
}
