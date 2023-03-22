import { Identifiable } from "../common-types.js";

export interface Person extends Identifiable {
    firstName: string;
    lastName: string;
    email: string;
    contact?: Contact;
    greet(): string;
}

export interface Contact {
    country: string;
    city?: string;
    address?: string;
    phone?: string;
}

export class NaturalPerson implements Person {
    constructor(
        public id: number,
        public firstName: string,
        public lastName: string,
        public email: string,
        public contact?: Contact,
    ) { }
    greet() {
        const contactStr = this.contact ? `: ${this.contact.country}
            ${this.contact.city? ', ' + this.contact.city : ''}
            ${this.contact.address? ', ' + this.contact.address : ''}
            ${this.contact.phone? ', ' + this.contact.phone : ''}`
        : '';
        return `${this.firstName} ${this.lastName} [${this.email}]${contactStr || ''}`;
    }
}