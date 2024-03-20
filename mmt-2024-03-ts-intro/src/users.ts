import { IdType } from "./common-types.js";

export interface Person {
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

export interface UserI extends Person {
    password: string;
    roles: Role[]; // or Array<Role>;
}

export enum Role {
    Author = 1, Reader, Admin
}

export class UserBase implements UserI {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact,
        public roles: Role[] = [Role.Reader],
        public id?: IdType
    ) {}
}


export class User extends UserBase {
    get salutation() {
        return `Hello ${this.firstName} ${this.lastName} [${this.email}] in roles: ${this.roles.map(r => Role[r]).join(', ')}`;
    }
}