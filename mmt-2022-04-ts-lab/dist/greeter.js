import { Role, UserBase } from "./users.js";
export function greeter(user) {
    return `${user.salutation} from TypeScript 4.6!`;
}
export const DEFAULT_USERS = [
    new UserBase(1, 'Ivan', 'Petrov', 'ivan@dir.bg', 'ivan123', [Role.READER, Role.AUTHOR, Role.ADMIN])
];
//# sourceMappingURL=greeter.js.map