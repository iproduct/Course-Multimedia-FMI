export class NaturalPerson {
    constructor(id, firstName, lastName, email, contact) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.contact = contact;
    }
    greet() {
        const contactStr = this.contact ? `: ${this.contact.country}
            ${this.contact.city ? ', ' + this.contact.city : ''}
            ${this.contact.address ? ', ' + this.contact.address : ''}
            ${this.contact.phone ? ', ' + this.contact.phone : ''}`
            : '';
        return `${this.firstName} ${this.lastName} [${this.email}]${contactStr || ''}`;
    }
}
//# sourceMappingURL=person.js.map