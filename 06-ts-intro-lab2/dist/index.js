import { LoginComponent } from './login-component.js';
import { LoginControllerImpl } from './login-controller.js';
import { RepositoryImpl, NumberIdGenerator } from './repository.js';
import { Admin, Customer, Manager, UserImpl, Role } from './users.js';
var user1 = new Admin('Default', 'Admin', 'admin@abc.com', 'admin', { country: 'Bulgaria', address: 'Sofia 1000' });
var numberIdGen = new NumberIdGenerator;
var userRepo = new RepositoryImpl(numberIdGen);
userRepo.create(user1);
userRepo.create(new Manager('Ivan', 'Petrov', 'ivan@abc.com', 'ivan', { country: 'Bulgaria', address: 'Plovdiv 4000' }));
userRepo.create(new Customer('Petya', 'Hristova', 'petya@abc.com', 'petya'));
userRepo.create(new UserImpl('Hrisitina', 'Dimitrova', 'hrisi@abc.com', 'hrisi', [Role.ADMIN, Role.MANGER, Role.CUSTOMER]));
console.log(userRepo.findAll());
var contentElem = document.getElementById('content');
if (contentElem) {
    contentElem.innerHTML = '<ul>' + userRepo.findAll().map(function (user) { return "<li>" + user.salutation + "</li>"; }).join('\n') + '</ul>';
}
var loginController = new LoginControllerImpl(userRepo);
var loginComponent = new LoginComponent('#content', loginController);
//# sourceMappingURL=index.js.map