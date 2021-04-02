function greeter(person: string) {
    return `Hello ${person} from TypeScript!`;
}

const user = "Trayan";
document.getElementById('content').innerHTML = greeter(user);