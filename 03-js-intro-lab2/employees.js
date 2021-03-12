'use strict';

function Person(name, age) {
    this.name = name;
    this.age = age;
}

Person.prototype.toString = function () { //overiding
    return this.name + ", age: " + this.age;
}


function Employee(name, age, practice, qualifications) {
    Person.apply(this, [name, age]);
    this.practice = practice;
    this.qualifications = qualifications;
}

// inheritance in ES5 style
Employee.prototype = new Person();
Employee.prototype = Object.create(Person.prototype);
Employee.prototype.constructor = Employee;

Employee.prototype.toString = function () { //overiding
    return Person.prototype.toString.call(this) + ', practice: ' + this.practice + ', qualification: ' + this.qualifications;
}

var p1 = new Person('John Smith', 35);
// console.log(p1.toString());
var e2 = new Employee('Ivan Petrov', 35, 12, ['JavaScript', 'TypeScript', 'Angular']);
// console.log(e2.toString());

var employees = [
    new Employee('Ivan Petrov', 35, 12, ['JavaScript', 'TypeScript', 'Angular']),
    new Employee('George Hamilton', 42, 5, ['JavaScript', 'Node.js', 'Express']),
    new Employee('Amy Smith', 45, 15, ['Java', 'JavaScript', 'Spring', 'JavaEE', 'MySQL']),
    new Employee('Andrew Harrison', 22, 0, []),
    new Employee('Caren Blake', 39, 7, ['JavaScript', 'Ruby', 'Kotlin', 'Java', 'MySQL']),
    new Employee('Jane Blake', 21, 0),
];

var allQualifications = employees.filter(function (emp) {
    return emp.qualifications && emp.qualifications.length > 0;
}).flatMap(function (emp) {
    return emp.qualifications;
}).reduce(function (acc, qual) {
    return acc.indexOf(qual) >= 0 ? acc : acc.concat(qual);
}, []).sort();

console.log(allQualifications);
console.log(
    employees.sort(function (e1, e2) {
        // return e1.practice - e2.practice;
        return e1.name.localeCompare(e2.name);
    })
);

