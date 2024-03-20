import { Identifiable, IdType } from "./common-types.js";

export interface Person extends Identifiable<IdType>{
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
    roles: Role[]; // or Array<Role>;
}

export enum Role {
    Author = 1, Reader, Admin
}

class UserBase implements Omit<User, "id"> {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public password: string,
        public contact?: Contact,
        public roles: Role[] = [Role.Reader],
    ) {}
}


export class UserDto extends UserBase {
    get salutation() {
        return `Hello ${this.firstName} ${this.lastName} [${this.email}] in roles: ${this.roles.map(r => Role[r]).join(', ')}`;
    }
}