import { IdType } from "./index.js";

export interface Person {
    id: IdType;
    firstName: string;
    lastName: string;
    email: string;
    contact?: Contact;
}

export interface Contact {
    country: string;
    city?: string;
    address?: string;
    phone?: string;
}

export interface User extends Person {
    password: string;
    roles: Array<Role>
    readonly salutation: string;
    getSalutation(): string;
    // getSalutation: () => string;
}

export enum Role {
    READER = 1, AUTHOR, ADMIN
}

export class UserBase implements User {
    constructor(
        public id: IdType,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public roles: Role[] = [],
        public contact?: Contact,
    ) { }
    get salutation() {
        return this.getSalutation();
    }
    getSalutation(): string {
        return `Hi ${this.firstName} ${this.lastName} in roles: ${this.roles.map(r => Role[r]).join(", ")}`
    }
}

export class Reader extends UserBase {
    constructor(
        public id: IdType,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact | undefined,
        public roles: Role[] = [Role.READER],
    ) {
        super( id, firstName, lastName, email, password, roles, contact,)
     }
     toString(): string {
        return `Reader{name: ${this.firstName} ${this.lastName}, roles: ${this.roles.map(r => Role[r]).join(", ")}, email: ${this.email}, password: ${this.password}}`
    }
}
export class Author extends UserBase {
    constructor(
        public id: IdType,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact | undefined,
        public roles: Role[] = [Role.AUTHOR],
    ) {
        super( id, firstName, lastName, email, password, roles, contact,)
     }
     toString(): string {
        return `Author{name: ${this.firstName} ${this.lastName}, roles: ${this.roles.map(r => Role[r]).join(", ")}, email: ${this.email}, password: ${this.password}}`
    }
}
export class Admin extends UserBase {
    constructor(
        public id: IdType,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact | undefined,
        public roles: Role[] = [Role.ADMIN],
    ) {
        super( id, firstName, lastName, email, password, roles, contact,)
     }
     toString(): string {
        return `Admin{name: ${this.firstName} ${this.lastName}, roles: ${this.roles.map(r => Role[r]).join(", ")}, email: ${this.email}, password: ${this.password}}`
    }
}

