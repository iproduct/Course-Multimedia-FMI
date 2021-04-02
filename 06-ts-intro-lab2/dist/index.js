import { Admin } from './users.js';
var user1 = new Admin(1, 'Default', 'Admin', 'admin@mycompany.com', 'admin', { country: 'Bulgaria', address: 'Sofia 1000' });
console.log(user1);
var contentElem = document.getElementById('content');
if (contentElem) {
    contentElem.innerHTML = JSON.stringify(user1);
}
//# sourceMappingURL=index.js.map