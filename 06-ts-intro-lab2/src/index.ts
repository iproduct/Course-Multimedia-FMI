import { Repository, RepositoryImpl, IdGenerator, NumberIdGenerator } from './repository.js';
import {User, Admin, Customer, Manager, UserImpl, Role} from './users.js';

const user1 = new Admin('Default', 'Admin', 'admin@abc.com', 'admin', {country: 'Bulgaria', address: 'Sofia 1000'});
const numberIdGen: IdGenerator = new NumberIdGenerator;
const userRepo: Repository<User> = new RepositoryImpl<User>(numberIdGen);
userRepo.create(user1);
userRepo.create(new Manager('Ivan', 'Petrov', 'ivan@abc.com', 'ivan', {country: 'Bulgaria', address: 'Plovdiv 4000'}));
userRepo.create(new Customer('Petya', 'Hristova', 'petya@abc.com', 'petya'));
userRepo.create(new UserImpl('Hrisitina', 'Dimitrova', 'hrisi@abc.com', 'hrisi', [Role.ADMIN, Role.MANGER, Role.CUSTOMER]));

console.log(userRepo.findAll());

const contentElem = document.getElementById('content');
if(contentElem) {
    contentElem.innerHTML = '<ul>' + userRepo.findAll().map(user => `<li>${user.salutation}</li>`).join('\n') + '</ul>';
}