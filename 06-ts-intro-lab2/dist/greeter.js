"use strict";
function greeter(person) {
    return "Hello " + person + " from TypeScript!";
}
var user = "Trayan";
var contentElem = document.getElementById('content');
if (contentElem) {
    contentElem.innerHTML = greeter(user);
}
//# sourceMappingURL=greeter.js.map