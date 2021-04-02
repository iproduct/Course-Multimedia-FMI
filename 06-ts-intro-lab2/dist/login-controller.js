var LoginControllerImpl = (function () {
    function LoginControllerImpl(userRepo) {
        this.userRepo = userRepo;
        this.loggedUser = undefined;
    }
    LoginControllerImpl.prototype.login = function (principal, credentials) {
        var email, password;
        if (typeof principal === 'string') {
            email = principal;
            password = credentials || '';
        }
        else {
            email = principal.email;
            password = principal.password;
        }
        var user = this.userRepo.findByEmail(email);
        if (user && user.password === password) {
            this.loggedUser = user;
            return Promise.resolve(user);
        }
        else {
            this.loggedUser = undefined;
            return Promise.reject(new Error("Incorrect email or password."));
        }
    };
    LoginControllerImpl.prototype.logout = function () {
        this.loggedUser = undefined;
    };
    LoginControllerImpl.prototype.getCurrentUser = function () {
        return this.loggedUser;
    };
    return LoginControllerImpl;
}());
export { LoginControllerImpl };
//# sourceMappingURL=login-controller.js.map