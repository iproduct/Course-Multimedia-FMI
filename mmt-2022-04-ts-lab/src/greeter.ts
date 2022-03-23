import { User, UserBase } from "./users";

export function greeter(user: User) {
    return `${user.salutation} from TypeScript 4.6!`;
}

export const user = new UserBase(1, "");