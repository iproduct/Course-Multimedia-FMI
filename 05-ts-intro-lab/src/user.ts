import { Person, Contact } from './person.js';
import { IdType } from './shared-types.js';

export interface User extends Person {
    password: string;
    roles: Role[];
    readonly salutation: string;
    getSalutation(): string;
}

export enum Role {
    AUTHOR = 1, READER, ADMIN
}

export class UserBase implements User {
    constructor(
        public id: IdType,
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public roles: Role[],
        public contact?: Contact
    ) {}

    get salutation() {
        return `${this.firstName} ${this.lastName} in roles: ${this.roles.map(role => Role[role]).join(', ')}`;
    }

    getSalutation(): string {
        return this.salutation;
    }
}

export class Author extends UserBase {
    constructor(
        id: IdType,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        roles: Role[] = [],
        contact?: Contact
    ) {
        super(id, firstName, lastName, email, password, 
            (roles.indexOf(Role.AUTHOR) >= 0 ? roles : [...roles, Role.AUTHOR]),
            contact);
    }

    // Overides method from base class
    getSalutation(): string {
        return `Author: ${super.getSalutation()}`;
    }
} 

export class Reader extends UserBase {
    constructor(
        id: IdType,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        roles: Role[] = [],
        contact?: Contact
    ) {
        super(id, firstName, lastName, email, password, 
            (roles.indexOf(Role.READER) >= 0 ? roles : [...roles, Role.READER]),
            contact);
    }

    // Overides method from base class
    getSalutation(): string {
        return `Reader: ${super.getSalutation()}`;
    }
} 

export class Admin extends UserBase {
    constructor(
        id: IdType,
        firstName: string,
        lastName: string,
        email: string,
        password: string,
        roles: Role[] = [],
        contact?: Contact
    ) {
        super(id, firstName, lastName, email, password, 
            (roles.indexOf(Role.ADMIN) >= 0 ? roles : [...roles, Role.ADMIN]),
            contact);
    }

    // Overides method from base class
    getSalutation(): string {
        return `Admin: ${super.getSalutation()}`;
    }
} 