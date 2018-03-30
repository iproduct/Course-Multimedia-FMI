function greeter(person: string) {
    return 'Hello, ' + person + ' from Typescript!';
}
const user = 'Super User';
document.body.innerHTML = greeter(user);