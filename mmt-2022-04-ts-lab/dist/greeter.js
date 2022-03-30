import { Admin, Role, Reader, Author } from "./users.js";
export function greet(user) {
    return user.toString();
}
export const DEFAULT_USERS = [
    new Admin(1, 'Ivan', 'Petrov', 'ivan@dir.bg', 'ivan123', { country: 'BG', city: 'Sofia 1000', address: 'J. Bourchier, FMI' }, [Role.READER, Role.AUTHOR, Role.ADMIN]),
    new Reader(1, 'Dimitar', 'Hristov', 'dimitar@dir.bg', 'mitko123'),
    new Author(1, 'Maria', 'Petrova', 'maria@dir.bg', 'mari123')
];
//# sourceMappingURL=greeter.js.map