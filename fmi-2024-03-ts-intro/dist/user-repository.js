import { RepositoryImpl } from './repository.js';
export class UserRepositoryImpl extends RepositoryImpl {
    findByRole(user) {
        return user.roles;
    }
    ;
    findByEmail(email) {
        return this.findAll().find(u => u.email === email);
    }
}
//# sourceMappingURL=user-repository.js.map