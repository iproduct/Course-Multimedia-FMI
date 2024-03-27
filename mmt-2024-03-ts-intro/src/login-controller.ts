import { User } from "./users.js";

export interface LoginController {
    login(email: string, password: string): Promise<User>;
    login(user: User): Promise<User>;
}

export class DemoLoginController implements LoginController {
    login(principal: User | string, credentials?: string): Promise<User> {
        let email: string, password: string;
        if (typeof principal === 'string') {
            email = principal;
            password = credentials as string;
        } else {
            email = principal.email;
            password = principal.password;
        }
        let promise = new Promise<User>((resolve, reject) => { … });
        return promise;
    }
}
