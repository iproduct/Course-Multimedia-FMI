import { Customer, Admin } from './users.js';
import { DemoLoginController, UserRepository } from './controller.js';
import { LoginComponent } from './login-component.js';
const user1 = new Customer(1, 'John', 'Smith', 'john@gmail.com', 'john123', {
    city: 'Sofia',
    address: '1000'
});
const user2 = new Admin(1, 'Ivan', 'Petrov', 'ivan@abv.bg', 'ivan123', {
    city: 'Sofia',
    address: '1000'
});
const userRepo = new UserRepository();
userRepo.create(user1);
userRepo.create(user2);
const allUsers = userRepo.findAll();
for (let u of userRepo) {
    console.log('!', u);
}
document.getElementById('content').innerHTML = allUsers
    .map(user => user.salutation)
    .join("<br>");
const loginController = new DemoLoginController(userRepo);
const loginComponent = new LoginComponent('#content', loginController);
//# sourceMappingURL=index.js.map