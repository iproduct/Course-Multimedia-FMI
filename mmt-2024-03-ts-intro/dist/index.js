var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { DemoLoginController } from './login-controller.js';
import { UserRepositoryImpl } from './user-repository.js';
import { NumberIdGenerator } from './repository.js';
import { Role, UserDto } from "./users.js";
const users = [
    new UserDto('John', 'Doe', 'john@gmail.com', 'john123', { country: 'USA', city: 'New York' }, [Role.Admin, Role.Author, Role.Reader]),
    new UserDto('Jane', 'Doe', 'jane@gmail.com', 'jane123', { country: 'USA', city: 'Seattle' }, [Role.Author, Role.Reader]),
    new UserDto('Ivan', 'Petrov', 'ivan@gmail.com', 'ivan123', { country: 'BG', city: 'Sofia' }, [Role.Reader]),
];
const userRepo = new UserRepositoryImpl(new NumberIdGenerator());
users.forEach(u => userRepo.create(u));
const elem = document.getElementById('content');
const usersHtml = userRepo.findAll().map(user => `<li>${user.salutation}</li>`).join('');
if (elem !== null) {
    elem.innerHTML = `<ul>${usersHtml}</ul>`;
}
class Post {
    constructor(title) {
        this.title = title;
    }
}
class Author {
    constructor(name) {
        this.name = name;
    }
}
function create(ctor, s) {
    return new ctor(s);
}
console.log(create(Post, 'Moby'));
console.log(create(Author, 'Moby'));
const entities = ["One", "Two", "Three", "Four", "Five"].map(s => {
    const ctor = Math.random() > 0.5 ? Post : Author;
    return create(ctor, s);
});
function isPost(obj) {
    return 'title' in obj;
    // return (obj as Post).title !== undefined;
}
function log(arr) {
    arr.forEach(obj => {
        // if(obj instanceof Post) { // 1
        //     console.log('Post: ', obj.title);
        // } else {
        //     console.log('Author: ', obj.name);
        // }
        // if('title' in obj) { //2
        //     console.log('Post: ', obj.title);
        // } else {
        //     console.log('Author: ', obj.name);
        // }
        if (isPost(obj)) {
            console.log('Post: ', obj.title);
        }
        else {
            console.log('Author: ', obj.name);
        }
    });
}
// log(entities);
const sampleUser = userRepo.findById(2);
const loginController = new DemoLoginController(userRepo);
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const loggedUser = yield loginController.login(sampleUser);
        if (elem) {
            elem.innerHTML += `<p>LOGIN SUCCESS: ${loggedUser}</p>`;
        }
        console.log('LOGIN SUCCESS:', loggedUser);
    }
    catch (err) {
        console.log('LOGIN FAILURE:', err);
    }
}))(); //IIFE
//# sourceMappingURL=index.js.map