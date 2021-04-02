export class LoginControllerImpl {
    constructor(userRepo) {
        this.userRepo = userRepo;
        this.loggedUser = undefined;
    }
    login(principal, credentials) {
        let email, password;
        if (typeof principal === 'string') {
            email = principal;
            password = credentials || '';
        }
        else {
            email = principal.email;
            password = principal.password;
        }
        const user = this.userRepo.findByEmail(email);
        if (user && user.password === password) {
            this.loggedUser = user;
            return Promise.resolve(user);
        }
        else {
            this.loggedUser = undefined;
            return Promise.reject(new Error(`Incorrect email or password.`));
        }
    }
    logout() {
        this.loggedUser = undefined;
    }
    getCurrentUser() {
        return this.loggedUser;
    }
}
