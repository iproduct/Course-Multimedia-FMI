import { RepositoryImpl } from './repository.js';
import { IdType } from "./common-types.js";
import { Repository } from "./repository.js";
import { User } from "./users.js";

export interface UserRepository extends Repository<IdType, User> {
    findByEmail(email: string): User | undefined;
}

export class UserRepositoryImpl extends RepositoryImpl<IdType, User> implements UserRepository {
    findByEmail(email: string): User | undefined {
        throw new Error('Method not implemented.');
    }
}