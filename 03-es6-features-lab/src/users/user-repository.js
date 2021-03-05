// const User = require('./users');
import User from './users.js';

const MOCK_USERS = [
    new User('Default', 'Admin', 'admin', 'admin', 'admin', 'NON_BINARY',
    'https://freesvg.org/img/user2.png', 'Default administrator created by the system.'),
    new User('Ivan', 'Petrov', 'ivan', 'ivan', 'author', 'MALE',
    'https://freesvg.org/img/user2.png'),
    new User('Dimitar', 'Georgiev', 'dimitar', 'dimitar', 'author', 'MALE',
    'https://freesvg.org/img/user2.png')
];

let nextId = 0;
class UserRepository {
    users = new Map();
    constructor() {
        MOCK_USERS.forEach(user => this.create(user));
    }
    create(user) {
        user.id = ++nextId;
        this.users.set(user.id, user);
        return user;
    }
    findAll() {
        return this.users.values();
    }
    findById(id) {
        return this.users.get(id);
    }
    update(user) {
        this.users.set(user.id, user);
        return user;
    }
    deleteById(id){
        return this.users.delete(id);
    }
    getCount() {
        return this.users.size;
    }
}

const userRepo = new UserRepository();
// for(const user of userRepo.findAll()) {
//     console.log(user);
// }
const firstUser = userRepo.findById(1);
firstUser.password = 'mynewpass';
userRepo.update(firstUser);
console.log(Array.from(userRepo.findAll()));

userRepo.deleteById(2);
console.log(Array.from(userRepo.findAll()));
console.log(userRepo.getCount());

export default UserRepository;