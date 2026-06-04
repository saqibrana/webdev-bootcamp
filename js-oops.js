// 1. CONSTRUCTOR FUNCTION (old way, pre-ES6)
function PersonOld(name, age) {
    this.name = name;
    this.age = age;
}

// 2. PROTOTYPE - method shared across all instances (not copied per object)
PersonOld.prototype.introduce = function() {
    return `Hi, my name is ${this.name} and I'm ${this.age} years old`;
}

// 3. CLASS - modern ES6+ syntax 
class Person {
    // 4. PRIVATE FIELDS - truly inacessible outside the class
    #name;
    #age;

    // 5. STATIC - belongs to class itself, not instances
    static count = 0;

    constructor(name, age) {
        if (typeof name !== "string" || name.trim() === "") {
            throw new Error("Name must be a non-empty string"); // 6. Error
        }
        if (typeof age !== "number" || age < 0) {
            throw new Error("Age must be a positive number");
        }
        this.#name = name;
        this.#age = age;
        Person.count++;
    }

    // 7. GETTERS AND SETTERS - controlled access to private fields (Encapsulation)
    get name() { return this.#name; }
    set name(value) {
        if (typeof value !== "string" || value.trim() === "") {
            throw new Error("Name must be a non-empty string");
        }
        this.#name = value;
    }
    get age() { return this.#age; }
    set age(value) {
        if (typeof value !== "number" || value < 0) {
            throw new Error("Age must be a positive number");
        }
        this.#age = value;
    }

    // 8. ABSTRACTION - expose simple interface and hide internal details (method)
    introduce() {
        return `Hi, my name is ${this.#name} and I'm ${this.#age} years old`;
    }

    static getCount() {
        return `Total persons added: ${Person.count}`
    }
}

// 9. INHERITANCE

class Student extends Person {
    #grade; // private field specific to Student

    constructor(name, age, course, grade) {
        super(name, age) // must call Person's constructor first
        this.course = course;
        this.#grade = grade;
    }
    
    get grade() { return this.#grade; }

    study() {
        return `${this.name} is studying ${this.course}`;
    } 

    // 10. POLYMORPHISM - overrides Person's introduce() with its own version, same method name, different behaviour
    introduce() {
        return `${super.introduce()}, and I study ${this.course}`;
    }

}

class Teacher extends Person {
    constructor(name, age, subject) {
        super(name, age);
        this.subject = subject;
    }

    introduce() {
        return `${super.introduce()}, and I teach ${this.subject}`;
    }
}

const saqib = new Person("Saqib", 41);
const ezaan = new Student("Ezaan", 13, "Math", "A");
const ustad = new Teacher("Mr. Khan", 45, "Science");

// Polymorphism in action - same method, different output per class
const people = [saqib, ezaan, ustad];
people.forEach(p => console.log(p.introduce()));

// Inheritance
console.log(ezaan.study());     // Student-only method
console.log(ezaan.grade);       // getter for private #grade

// Static
console.log(Person.getCount()); // Total persons created: 3

// Getters and Setters
saqib.name = "Saqib Rana";
console.log(saqib.name);        // Saqib Rana

// Error handling
try {
    const invalid = new Person("", -1);
} catch (e) {
    console.log(e.message);     // Name must be a non-empty string
}