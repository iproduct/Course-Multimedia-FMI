var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { RepositoryImpl } from "./repository.js";
import { resolvePromiseAfterTimeout } from "./utilities.js";
import { validate, required, minLength } from './decorators.js';
export class UserRepository extends RepositoryImpl {
    findUserByEmail(email) {
        return this.findAll().find(u => u.email === email);
    }
}
export class DemoLoginController {
    constructor(repository) {
        this.repository = repository;
        this.loggedUser = undefined;
    }
    login(principal, credentials) {
        try {
            return this.loginImpl(principal, credentials);
        }
        catch (e) {
            return Promise.reject(e);
        }
    }
    loginImpl(principal, credentials) {
        let email;
        let password;
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
                let user = this.repository.findUserByEmail(email);
                if (!user || user.password !== password) {
                    reject(new Error(`Invalid username or password`));
                }
                this.loggedUser = user;
                resolve(user);
            }, 1000);
        });
        return promise;
    }
    logout() {
        const user = this.getCurrentUser();
        this.loggedUser = undefined;
        return resolvePromiseAfterTimeout(user, 500);
    }
    getCurrentUser() {
        return this.loggedUser;
    }
}
__decorate([
    validate,
    __param(0, required), __param(0, minLength(2)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], DemoLoginController.prototype, "loginImpl", null);
//# sourceMappingURL=controller.js.map