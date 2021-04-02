export interface Person {
    id: number | undefined;
    firstName: string;
    lastName: string;
    contact?: Contact;
}

export interface Contact {
    country: string;
    city?: string;
    address?: string;
    phone?: string;
}

export interface User extends Person {
    email: string;
    password: string;
    roles: Role[];
    readonly salutation: string;
}

export enum Role {
    CUSTOMER = 1, MANGER, ADMIN
}

export class UserImpl implements User {        
    public id: number | undefined;
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public roles: Role[] = [Role.CUSTOMER],
        public contact?: Contact | undefined) { }
    get salutation() {
        return `Hello, ${this.firstName} ${this.lastName} in roles: ${this.roles.map(r => Role[r]).join(', ')}`
    }
}

export class Customer extends UserImpl {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact | undefined) { 
            super(firstName, lastName, email, password, [Role.CUSTOMER], contact);
        }
}

export class Manager extends UserImpl {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact | undefined) { 
            super(firstName, lastName, email, password, [Role.MANGER], contact);
        }
}

export class Admin extends UserImpl {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact | undefined) { 
            super(firstName, lastName, email, password, [Role.ADMIN], contact);
        }
}