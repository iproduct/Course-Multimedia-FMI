import { Repository } from './repository';
import { Role, User } from "./users.js";


const users = [
    new User('John', 'Doe', 'john@gmail.com', 'john123', {country: 'USA', city: 'New York'}, [Role.Admin, Role.Author, Role.Reader], 1),
    new User('Jane', 'Doe', 'janen@gmail.com', 'jane123', {country: 'USA', city: 'Seattle'}, [Role.Author, Role.Reader], 2),
    new User('Ivan', 'Petrov', 'ivan@gmail.com', 'ivan123', {country: 'BG', city: 'Sofia'}, [Role.Reader], 3),
]


const elem = document.getElementById('content');
const usersHtml = users.map(user => `<li>${user.salutation}</li>`).join('');
if(elem !== null) {
    elem.innerHTML = `<ul>${usersHtml}</ul>`;
}


