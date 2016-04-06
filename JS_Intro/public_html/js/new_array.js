function init() {
    var a = ["first", "second", "third", "second", "fourth", "second", "fifth"];
    log(a.indexOf("second", 2));
    log(a.lastIndexOf("second", -3));
    var emloyees = [
        {name: "John", age: 35},
        {name: "Sara", age: 45},
        {name: "Bill", age: 39},
        {name: "Amy", age: 52},
        {name: "Ivan", age: 27},
        {name: "Dimitar", age: 45},
        {name: "Chris", age: 42}
    ];
    function isYoung(age) {
        return age <= 45;
    }
    function nextYear(person) {
        return ++person.age;
    }
    emloyees.map(nextYear).filter(isYoung).forEach(
        function (age) {
            log("age: " + age);
        });

//    log("Some emloyees older then 60: ",
//            emloyees.some(function (val, ind, arr) {
//                return val.age > 60;
//            })
//            );
//  log("Some emloyees older then 60: ",
//            emloyees.filter(function (val, ind, arr) {
//                return val.age > 40;
//            })
//            );

    emloyees.map(function (val, ind, arr) {
        return {
            name: val.name,
            age: val.age,
            description: (ind + 1) + ". I am " + val.name + " of age " + val.age
        };
    }).forEach(function (val, ind, arr) {
        log(ind + ". Employee: " + val.description);
    });

    var sumOfAge = emloyees.map(function (val, ind, arr) {
        return {
            name: val.name,
            age: val.age,
            description: (ind + 1) + ". I am " + val.name + " of age " + val.age
        };
    }).reduce(function (initialVal, val, ind, arr) {
        return val.age + initialVal;
    }, 0);
    log("Sum of age is: " + sumOfAge);
}