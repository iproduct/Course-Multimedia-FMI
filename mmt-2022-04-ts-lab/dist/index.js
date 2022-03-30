import { DEFAULT_USERS, greet } from "./greeter.js";
document.getElementById("users").innerHTML =
    DEFAULT_USERS.map(user => (`<li>${greet(user)}</li>`)).join('\n');
//# sourceMappingURL=index.js.map