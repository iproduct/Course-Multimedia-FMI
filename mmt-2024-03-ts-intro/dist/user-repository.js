import { RepositoryImpl } from './repository.js';
export class UserRepositoryImpl extends RepositoryImpl {
    findByRole(user) {
        return user.roles;
    }
    ;
    findByEmail(email) {
        throw new Error('Method not implemented.');
    }
}
//# sourceMappingURL=user-repository.js.map