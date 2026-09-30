# OOP in JavaScript — Cheat Sheet
(for [`script.js`](script.js))

**In one line:** a class is a blueprint for objects. JS classes are nicer syntax on top of **prototypes**.

## The 4 pillars, with your examples

| Pillar | Meaning | In `script.js` |
|---|---|---|
| **Encapsulation** | Hide data, control access | `#name`, `#age` + getters/setters with validation |
| **Abstraction** | Simple interface, hidden details | `introduce()`: callers don't care how it's built |
| **Inheritance** | Child reuses parent | `Student extends Person`, `super(name, age)` |
| **Polymorphism** | Same method name, different behaviour | `introduce()` differs for Person, Student and Teacher |

## Syntax to remember

```js
class Person {
  #age;                      // private: only usable inside the class
  static count = 0;          // on the class, not on instances

  constructor(age) { this.#age = age; Person.count++; }

  get age() { return this.#age; }            // p.age
  set age(v) { if (v < 0) throw new Error("bad"); this.#age = v; }  // p.age = 5

  static getCount() { return Person.count; } // Person.getCount(), not p.getCount()
}

class Student extends Person {
  constructor(age, course) {
    super(age);              // MUST come before using `this`
    this.course = course;
  }
  introduce() { return `${super.introduce()} ...`; }  // call the parent's version
}
```

## Old way vs new way

```js
function PersonOld(name) { this.name = name; }         // constructor function
PersonOld.prototype.hi = function () { ... };          // shared method

class Person { constructor(name) { this.name = name; } hi() { ... } }  // same thing
```
Methods on the **prototype** are shared by all instances, not copied into each one.

## Watch out (from your own code)

- **`static count` is public.** Anyone can write `Person.count = 0`. Use `static #count` with a getter if it should be protected.
- The comment says `// Total persons created: 3`, but the string prints `"Total persons added: 3"`. Small thing, but your comments should match the output.
- `super()` must be called **before** `this` in a child constructor, or you get a ReferenceError.
- Private fields aren't inherited for direct access. `Student` can't read `this.#name`. It has to use the `name` getter, which is why `study()` uses `this.name`.

## Where you'll see this in real apps
Models (User, Product), error classes (`class ValidationError extends Error`), UI components in older frameworks, and many Node libraries.
