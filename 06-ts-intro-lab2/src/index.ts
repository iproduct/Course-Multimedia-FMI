import {User, Admin, Customer, Manager} from './users.js';

const user1 = new Admin(1, 'Default', 'Admin', 'admin@mycompany.com', 'admin', {country: 'Bulgaria', address: 'Sofia 1000'});
console.log(user1);
const contentElem = document.getElementById('content');
if(contentElem) {
    contentElem.innerHTML = JSON.stringify(user1);
}