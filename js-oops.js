// 1. Constructor Function

function PersonOld(name, age) {
    this.name = name;
    this.age = age;
}

// 2. Prototype
PersonOld.prototype.introduce = function() {
    return `Hi, my name is ${this.name} and I'm ${this.age} years old`;
}

// 3. Class
class Person {
    // 4. Private fields
    #name;
    #age;

    // 5. Static - belongs to class itself, not instances
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

    // 7. Getters and Setters
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

    // 8. Abstraction - expose simple interface and hide internal details
    introduce = function() {
        return `Hi, my name is ${this.#name} and I'm ${this.#age} years old`;
    }

    static getCount() {
        return `Total persons added: ${Person.count}`
    }
}

const person1 = new PersonOld("Saqib", 41);
const person2 = new Person("Saqib", 41);

console.log(person1.introduce());
console.log(person2.introduce());
console.log(person2.name); // not eccessible outside of the class without getters and setters
console.log(Person.getCount());
