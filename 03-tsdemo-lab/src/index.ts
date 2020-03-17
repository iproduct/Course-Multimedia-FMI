import { Customer, Admin, User } from './users.js';
import { Repository, RepositoryImpl } from './repository.js';
import { LoginController, DemoLoginController, UserRepository } from './controller.js';
import { LoginComponent } from './login-component.js';

const user1 = new Customer(1, 'John', 'Smith', 'john@gmail.com', 'john123', {
  city: 'Sofia',
  address: '1000'
});
// console.log(user1.salutation);

const user2 = new Admin(1, 'Ivan', 'Petrov', 'ivan@abv.bg', 'ivan123', {
  city: 'Sofia',
  address: '1000'
});
// console.log(user2.salutation);

const userRepo = new UserRepository();
userRepo.create(user1);
userRepo.create(user2);
const allUsers = userRepo.findAll();
for(let u of userRepo) {
  console.log('!', u);
}

document.getElementById('content')!.innerHTML = allUsers
    .map(user => user.salutation)
    .join("<br>");

const loginController: LoginController = new DemoLoginController(userRepo);
const loginComponent = new LoginComponent('#content', loginController);
