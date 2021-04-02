import { Repository, RepositoryImpl } from "./repository.js";
import { User } from "./users.js";

export interface UserRepository extends Repository<User> {
    findByEmail(email: string): User | undefined;
}

export class UserRepositoryImpl extends RepositoryImpl<User> implements UserRepository{
    findByEmail(email: string): User | undefined {
        const users = this.entities.values();
        for(let user of users) {
            if(user.email === email) {
                return user;
            }
        }
        return undefined;
    }
}