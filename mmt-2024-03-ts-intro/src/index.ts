import { UserRepository, UserRepositoryImpl } from './user-repository.js';
import { NumberIdGenerator, Repository } from './repository.js';
import { Role, User, UserDto } from "./users.js";


const users = [
    new UserDto('John', 'Doe', 'john@gmail.com', 'john123', {country: 'USA', city: 'New York'}, [Role.Admin, Role.Author, Role.Reader]),
    new UserDto('Jane', 'Doe', 'janen@gmail.com', 'jane123', {country: 'USA', city: 'Seattle'}, [Role.Author, Role.Reader]),
    new UserDto('Ivan', 'Petrov', 'ivan@gmail.com', 'ivan123', {country: 'BG', city: 'Sofia'}, [Role.Reader]),
]

const userRepo: UserRepository = new UserRepositoryImpl(new NumberIdGenerator());
users.forEach(u => userRepo.create(u));

const elem = document.getElementById('content');
const usersHtml = userRepo.findAll().map(user => `<li>${user.salutation}</li>`).join('');
if(elem !== null) {
    elem.innerHTML = `<ul>${usersHtml}</ul>`;
}


class Post {
    constructor(public title: string) {}
}

class Author {
    constructor(public name: string) {}
}

type SomeCtor = {
    new (s: string) : Post;
}

type SomeOtherCtor = {
    new(s: string) : Author;
}

function create(ctor: SomeCtor | SomeOtherCtor, s: string) {
    return new ctor(s);
}

console.log(create(Post, 'Moby'));
console.log(create(Author, 'Moby'));

const entities = ["One","Two", "Three", "Four", "Five"].map(s => {
    const ctor = Math.random() > 0.5 ? Post : Author;
    return create(ctor, s);
})

type Entity =  Post | Author;

function isPost(obj: Entity): obj is Post { // type predicate
    return 'title' in obj;
    // return (obj as Post).title !== undefined;
  }

function log(arr: Entity[]) {
    arr.forEach(
        obj => {
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
            if(isPost(obj)) {
                console.log('Post: ', obj.title);
            } else {
                console.log('Author: ', obj.name);
            }
        }
    )
}

log(entities);

