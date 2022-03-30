import { DEFAULT_USERS, greet } from "./greeter.js";
import { RepositoryImpl } from "./repository.js";
export class NumberIdGenerator {
    constructor() {
        this.nextId = 0;
    }
    getNextId() {
        return ++this.nextId;
    }
}
const idGenerator = new NumberIdGenerator();
const userRepo = new RepositoryImpl(idGenerator);
for (const user of DEFAULT_USERS) {
    userRepo.create(user);
}
document.getElementById("users").innerHTML =
    userRepo.findAll().map(user => (`<li>${greet(user)}</li>`)).join('\n');
//# sourceMappingURL=index.js.map