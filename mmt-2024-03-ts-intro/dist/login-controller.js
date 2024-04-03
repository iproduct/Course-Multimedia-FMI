export class DemoLoginController {
    constructor(userRepo) {
        this.userRepo = userRepo;
    }
    login(principal, credentials) {
        let email, password;
        if (typeof principal === 'string') {
            email = principal;
            password = credentials;
        }
        else {
            email = principal.email;
            password = principal.password;
        }
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                const user = this.userRepo.findByEmail(email);
                if (user) {
                    resolve(user);
                }
                else {
                    reject(new Error(`User with email "${email}" not found`));
                }
            }, 500);
        });
        return promise;
    }
}
//# sourceMappingURL=login-controller.js.map