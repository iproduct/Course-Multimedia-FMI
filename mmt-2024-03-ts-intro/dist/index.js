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
log(entities);
//# sourceMappingURL=index.js.map