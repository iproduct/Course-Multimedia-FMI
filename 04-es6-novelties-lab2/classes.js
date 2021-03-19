class Person {
    constructor(id, fName, lName, address) {
        this.id = id;
        this.fName = fName;
        this.lName = lName;
        this.address = address;
    }
    toString() {
        return `ID: ${this.id}, Name: ${this.fName + ' ' + this.lName}, Address: ${this.address}`;
    }
}

const ROLE_USER = 0, ROOLE_ADMIN = 1;
const Role = ['ROLE_USER', 'ROOLE_ADMIN'];

class User extends Person {
    constructor(id, fName, lName, address, username, password, roles = [ROLE_USER] ) {
        super(id, fName, lName, address);
        this.username = username;
        this.password = password;
        this.roles = roles;
    }
    toString() {
        return `${super.toString()}, Username: ${this.username}, Password: ${this.password}, ` + 
        `Roles: [${this.roles.map(r => Role[r]).join(', ')}]`
    }
}


p1 = new Person(1, 'Ivan', 'Petrov', 'Sofia 1000');
console.log(p1.toString());

u2 = new User(2, 'Dimitar', 'Georgiev', 'Sofia, Ivan Asen 15', 'mitko', 'mitko');
console.log(u2.toString());
u3 = new User(3, 'Hristo', 'Georgiev', 'Sofia, Shipchenski prohod 25', 'hristo', 'hristo', [ROLE_USER, ROOLE_ADMIN]);
console.log(u3.toString());