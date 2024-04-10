import { UserRepository } from "./user-repository";
import { User, UserDto } from "./users.js";

export interface LoginController {
    login(email: string, password: string): Promise<User>;
    login(user: User): Promise<User>;
}

export class DemoLoginController implements LoginController {
    constructor(private userRepo: UserRepository) {}
    login(principal: User | string, credentials?: string): Promise<User> {
        let email: string, password: string;
        if (typeof principal === 'string') {
            email = principal;
            password = credentials as string;
        } else {
            email = principal.email;
            password = principal.password;
        }
        let promise = new Promise<User>((resolve, reject) => { 
            setTimeout(() => {
                const user = this.userRepo.findByEmail(email);
                if(user) {
                    resolve(user);
                } else {
                    reject(new Error(`User with email "${email}" not found`));
                }
            }, 500);
         });
        return promise;
    }
}
