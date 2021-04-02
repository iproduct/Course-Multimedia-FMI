import { UserRepository } from './user-repository';
import { User } from "./user.js";

export interface LoginController {
    login(user: User): Promise<User>;
    login(email: string, passsword: string): Promise<User>;
    logout(): void;
    getCurrentUser(): User | undefined;
}

export class LoginControllerImpl implements LoginController{
    private loggedUser: User | undefined = undefined;
    constructor(private userRepo: UserRepository) {}
    login(principal: User| string, credentials?: string): Promise<User> {
        let email, password: string;
        if(typeof principal === 'string') {
            email = principal;
            password = credentials || '';
        } else {
            email = principal.email;
            password = principal.password;
        }
        const user = this.userRepo.findByEmail(email);
        if(user && user.password === password) {
            this.loggedUser = user;
            return Promise.resolve(user);
        } else {
            this.loggedUser = undefined;
            return Promise.reject(new Error(`Incorrect email or password.`));
        }
    }
    logout(): void {
        this.loggedUser = undefined;
    }
    getCurrentUser(): User | undefined {
        return this.loggedUser;
    }

}