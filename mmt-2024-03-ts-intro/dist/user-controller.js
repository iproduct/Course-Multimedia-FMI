export class DemoLoginController {
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
        let promise = new Promise((resolve, reject) => { });
        return promise;
    }
}
//# sourceMappingURL=user-controller.js.map