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

Person.prototype.addFriend = function(newFriend) {
	this.friends.push(newFriend);
};

Person.prototype.greet = function() {
	console.log("I am a hooman")
};

// Tests
// Test creating people
var dude1 = new Person("Filbert", "05-05-1972", []);
console.log(dude1);
var dude2 = new Person("Waluigi", "02-29-2000", []);
console.log(dude2);
var dude3 = new Person("Tybalt", "11-22-1997", []);
console.log(dude3);
var dude4 = new Person("Mercutio", "03-14-1997", []);
console.log(dude4);
console.log("----------------------------------------------");

// Test changing name
dude1.changeName("Dumbledore");
console.log(dude1);
console.log("----------------------------------------------");


// Test getting age
console.log(dude2.getAge());
if (dude3.getAge < dude4.getAge) {
	console.log(dude3.name + " is younger than " + dude4.name);
}
else if (dude3.getAge === dude4.getAge) {
	console.log(dude3.name + " and " + dude4.name + " are the same age");
}
else {
	console.log(dude3.name + " is older than " + dude4.name);
}
console.log("----------------------------------------------");


// Test adding friends
dude1.addFriend(dude2);
dude1.addFriend(dude3);
dude1.addFriend(dude4);
dude3.addFriend(dude4);
console.log(dude1);
console.log(dude3);
console.log("----------------------------------------------");


// Test greeting
dude2.greet();
console.log("----------------------------------------------");


// Exercise 2.2 ----------------------------------
// Inheritance and Polymorphism
function Student(name, birthdate, friends, major) {
    Person.call(this, name, birthdate, friends);
    this.major = major;
}

Student.prototype = Object.create(Person.prototype);

Student.prototype.changeMajor = function(newMajor) {
    this.major = newMajor;
};

Student.prototype.greet = function() {
	console.log("I am a school-going hooman (a.k.a. a student)");
};


// Tests
// Test student stuff
var kid1 = new Student("Bob the Tomato", "12-21-1993", [], "Agriculture");
console.log(kid1);
var kid2 = new Student("Luna Lovegood", "06-21-2003", [], "Classics");
console.log(kid2);
var isInstance = kid1 instanceof Person;
console.log("\n" + kid1.name + " is a Person --> " + isInstance);
isInstance = kid1 instanceof Student;
console.log(kid1.name + " is a Student --> " + isInstance);
isInstance = dude1 instanceof Person;
console.log(dude1.name + " is a Person --> " + isInstance);
isInstance = dude1 instanceof Student;
console.log(dude1.name + " is a Student --> " + isInstance);
//console.log(kid1 instanceof Person);
console.log("----------------------------------------------");

// Test changing name & major
kid1.changeName("Larry the Cucumber");
kid1.changeMajor("Biology");
console.log(kid1);
console.log("----------------------------------------------");


// Test getting age
console.log(kid1.getAge());
console.log(kid2.getAge());
console.log("----------------------------------------------");


// Test adding friends
kid1.addFriend(kid2);
kid1.addFriend(dude1);
kid1.addFriend(dude2);
dude1.addFriend(kid2);
console.log(kid1);
console.log(dude1);
console.log("----------------------------------------------");


// Test greeting
dude4.greet();
kid1.greet();
console.log("----------------------------------------------");

