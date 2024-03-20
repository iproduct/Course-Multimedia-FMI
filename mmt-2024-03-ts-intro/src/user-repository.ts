import { IdType } from "./common-types.js";
import { Repository } from "./repository.js";
import { User } from "./users";

export interface UserRepository extends Repository<IdType, User> {
    findByEmail(email: string): User | undefined;
}