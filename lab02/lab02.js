/**
 * Lab 2 - JavaScript
 * Name: Lydia Holtrop
 * Date: Fall 2018
 */


// Exercise 2.1 ----------------------------------
// Encapsulation
function Person(name, birthdate, friends) {
    this.name = name;
    this.birthdate = birthdate;
    this.friends = friends;
}

Person.prototype.changeName = function(newName) {
    this.name = newName;
};

Person.prototype.getAge = function() {
    var today = new Date();
    var dob = new Date(this.birthdate);

    var age = today.getFullYear() - dob.getFullYear();
    var m = today.getMonth() - dob.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < dob.getDate())) {
        age--;
    }
    return age;
};

var s1 = new Person(0, 0);
console.log(s1);
var s2 = new Person(1, 2);
s2.move(2, 3);
console.log(s2);

