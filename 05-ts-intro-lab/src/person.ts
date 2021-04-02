import { Indentifiable, IdType } from './shared-types.js';

export interface Person extends Indentifiable {
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