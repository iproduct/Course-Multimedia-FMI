import { Customer, Admin } from './users.js';
import { RepositoryImpl } from './repository.js';
const user1 = new Customer(1, 'John', 'Smith', 'john@gmail.com', 'john123', {
    city: 'Sofia',
    address: '1000'
});
console.log(user1.salutation);
const user2 = new Admin(1, 'Ivan', 'Petrov', 'ivan@abv.bg', 'ivan123', {
    city: 'Sofia',
    address: '1000'
});
console.log(user2.salutation);
const userRepo = new RepositoryImpl();
userRepo.create(user1);
userRepo.create(user2);
const allUsers = userRepo.findAll();
console.log(allUsers);
document.getElementById('content').innerHTML = allUsers
    .map(user => user.salutation)
    .join("<br>");
//# sourceMappingURL=index.js.map