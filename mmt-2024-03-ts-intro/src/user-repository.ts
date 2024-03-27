import { RepositoryImpl } from './repository.js';
import { IdType } from "./common-types.js";
import { Repository } from "./repository.js";
import { Role, User } from "./users.js";

type  RoleFinder = (user: User) => Role[];


export interface UserRepository extends Repository<IdType, User> {
    findByEmail(email: string): User | undefined;
    findByRole: RoleFinder;
}

export class UserRepositoryImpl extends RepositoryImpl<IdType, User> implements UserRepository {
    findByRole(user: User) {
        return user.roles;
    };
    findByEmail(email: string): User | undefined {
        throw new Error('Method not implemented.');
    }
}