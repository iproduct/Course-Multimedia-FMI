import { NaturalPerson } from "./model/persons";
function greeter(person) {
    return `Hello ${person.salutation}, from Typescript!`;
}
const p1 = new NaturalPerson(1, 'John', 'Doe', 'john@gmail.com');
const p2 = new NaturalPerson(2, 'Jane', 'Doe', 'jane@gmail.com', { country: 'GB', city: 'London', address: 'St. James Str 18', phone: '(+44) 32423423' });
document.getElementById('demo').innerHTML = greeter(p1) + '<br>' + greeter(p2);
//# sourceMappingURL=greeter.js.map