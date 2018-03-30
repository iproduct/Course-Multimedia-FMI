function greeter(person: string) {
    return 'Hello, ' + person + ' from Typescript!';
}
const user2 = 'Super User';
document.getElementById('content').innerHTML = greeter(user2);