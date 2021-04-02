function greeter(person: string) {
    return `Hello ${person} from TypeScript!`;
}

const user = "Petar";
const contentElem = document.getElementById('content');
if(contentElem) {
    contentElem.innerHTML = greeter(user);
}