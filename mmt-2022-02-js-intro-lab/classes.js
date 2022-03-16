class Person {
    static nextId = 0;
    id = ++Person.nextId;

    constructor(fName, lName, address) {
        this.fName = fName;
        this.lName = lName;
        this.address = address;
    }

    toString() {
        return `ID: ${this.id}, name: ${this.fName + ' ' + this.lName}, address: ${this.address}`
    }
}

const p1 = new Person('John', 'Doe', 'London, Baker Str. 32')
// console.log(p1.toString())
// console.log(typeof(Person))
const p2 = new Person('Ivan', 'Petrov', 'Sofia 1000')
// console.log(p2.toString())

class User extends Person {
    constructor(fName, lName, address, username, password, role){
        super(fName, lName, address);
        this.username = username;
        this.password = password;
        this.role = role;
    }
    //overiding
    toString() {
        return `${super.toString()}, username: ${this.username}, password: ${this.password}, role: ${this.role}`
    }
}

const u1 = new User('Violeta', 'Petrova', 'Provdiv', 'vili', 'violeta', 'ADMIN')
const u2 = new User('Dimitar', 'Geogiev', 'Ruse', 'dimo', 'dimo123', 'AUTHOR')
const u3 = new User('Hristo', 'Spasov', 'Sofia', 'hristo','hris123', 'READER')

function printAll(persons) {
    persons.forEach(person => {
        console.log(person.toString())
    });
}

printAll([u1, p1, u2, p2, u3])