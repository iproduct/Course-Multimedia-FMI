function greeter(user: string) {
    return `Hi ${user} from TypeScript 4.6!`;
}

const user = 'Trayan Iliev';

document.getElementById("app")!.innerHTML = greeter(user);