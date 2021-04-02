import { Person } from './person.js';
import { User, UserBase, Role, Author, Reader, Admin } from './user.js';

/**
 * @description greets the the user by name
 * @param  {string} name
 * @returns string
 */
function greeter(user: User): string {
    return `Hi ${user.getSalutation()}!`;
}

const users: User[] = [
    new Author(1, 'Dimitar', 'Petrov', 'mitko@abv.bg', 'mitko', [Role.READER],
        { country: 'Bulgaria', city: 'Sofia' }),
    new Reader(1, 'Maria', 'Petrova', 'mary@abv.bg', 'mary'),
    new Admin(1, 'Hristo', 'Petrov', 'hristo@abv.bg', 'hristo')
];

document.getElementById('greeting')!.innerHTML = users.map(user => greeter(user)).join('<br>');
