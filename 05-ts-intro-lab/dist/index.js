import { Role, Author, Reader, Admin } from './user.js';
import { MockUserRepository } from './user-repository.js';
import { LoginControllerImpl } from './login-controller.js';
import { LoginComponent } from './login-component.js';
/**
 * @description greets the the user by name
 * @param  {string} name
 * @returns string
 */
function greeter(user) {
    return `Hi ${user.getSalutation()}, password: ${user.password}.`;
}
const users = [
    new Author(1, 'Dimitar', 'Petrov', 'mitko@abv.bg', 'mitko', [Role.READER], { country: 'Bulgaria', city: 'Sofia' }),
    new Reader(1, 'Maria', 'Petrova', 'mary@abv.bg', 'mary'),
    new Admin(1, 'Hristo', 'Petrov', 'hristo@abv.bg', 'hristo')
];
const userRepo = new MockUserRepository();
users.forEach(u => userRepo.add(u));
const found = userRepo.findByEmail('mary@abv.bg');
if (found) {
    found.password = 'new_pass';
    userRepo.edit(found);
}
const loginController = new LoginControllerImpl(userRepo);
const loginComponent = new LoginComponent('#login', loginController);
// document.getElementById('greeting')!.innerHTML = userRepo.findAll().map(user => greeter(user)).join('<br>');
