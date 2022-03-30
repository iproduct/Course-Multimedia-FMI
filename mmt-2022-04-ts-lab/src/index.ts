import { DEFAULT_USERS, greet } from "./greeter.js";
import { IdGenerator, Repository, RepositoryImpl } from "./repository.js";
import { User } from "./users.js";

export type IdType = number

export class NumberIdGenerator implements IdGenerator<number> {
    private nextId = 0;
    getNextId(): number {
        return ++this.nextId;
    }
}

const idGenerator = new NumberIdGenerator();
const userRepo: Repository<IdType, User> = new RepositoryImpl<IdType, User>(idGenerator);

for (const user of DEFAULT_USERS) {
    userRepo.create(user);
}


document.getElementById("users")!.innerHTML =
   userRepo.findAll().map(user => (`<li>${greet(user)}</li>`)).join('\n');