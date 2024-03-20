import { UserRepositoryImpl } from './user-repository.js';
import { NumberIdGenerator } from './repository.js';
import { Role, UserDto } from "./users.js";
const users = [
    new UserDto('John', 'Doe', 'john@gmail.com', 'john123', { country: 'USA', city: 'New York' }, [Role.Admin, Role.Author, Role.Reader]),
    new UserDto('Jane', 'Doe', 'janen@gmail.com', 'jane123', { country: 'USA', city: 'Seattle' }, [Role.Author, Role.Reader]),
    new UserDto('Ivan', 'Petrov', 'ivan@gmail.com', 'ivan123', { country: 'BG', city: 'Sofia' }, [Role.Reader]),
];
const userRepo = new UserRepositoryImpl(new NumberIdGenerator());
users.forEach(u => userRepo.create(u));
const elem = document.getElementById('content');
const usersHtml = userRepo.findAll().map(user => `<li>${user.salutation}</li>`).join('');
if (elem !== null) {
    elem.innerHTML = `<ul>${usersHtml}</ul>`;
}
//# sourceMappingURL=index.js.map