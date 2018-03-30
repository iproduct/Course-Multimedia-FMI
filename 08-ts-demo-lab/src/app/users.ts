interface Person {
    id: number;
    fName: string;
    lName: string;
    email: string;
    contact? : Contact;
}

interface Contact {
    address: string;
    city?: string;
    country?: string;
    phone?: string;
}

export interface User extends Person {
    password: string;
    roles: Role[];
    readonly congratulation: string;
}

export enum Role {
    CUSTOMER = 1 , ADMIN
}

let nextId = 0;

export class Customer implements User {
    // private static nextId = 0;
    id = nextId++;
    get congratulation(): string {
        return `${this.fName} ${this.lName} in role: ${Role[this.roles[0]]}`;
    }
    constructor(
        public fName: string,
        public lName: string,
        public email: string,
        public password: string,
        public contact?: Contact,
        public roles: Role[] = [Role.CUSTOMER]) {}
}

export class Admin implements User {
    id = nextId++;
    get congratulation(): string {
        return `${this.fName} ${this.lName} in role: ${Role[this.roles[0]]}`;
    }
    constructor(
        public fName: string,
        public lName: string,
        public email: string,
        public password: string,
        public contact?: Contact,
        public roles: Role[] = [Role.ADMIN]) {}
}
