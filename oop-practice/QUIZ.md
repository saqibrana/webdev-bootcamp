# OOP in JavaScript — Quiz

Answer each question **without looking** at `script.js` or `NOTES.md`. Write your answer down, *then* open the answer.

Assume the classes from `script.js` exist.

---

### 1. What happens?
```js
const p = new Person("Ali", 30);
console.log(p.#name);
```
<details><summary>Answer</summary>

**SyntaxError.** You can't even *write* `#name` outside the class body. Use the getter: `p.name`.
</details>

---

### 2. Which of these work?
```js
ezaan.getCount();
Person.getCount();
Student.getCount();
```
<details><summary>Answer</summary>

- `ezaan.getCount()` → **TypeError**, because static methods aren't on instances.
- `Person.getCount()` → works.
- `Student.getCount()` → **works too**. Static methods are inherited by child classes.
</details>

---

### 3. What happens?
```js
saqib.age = -5;
```
<details><summary>Answer</summary>

The `age` setter runs and throws `Error: Age must be a positive number`. `#age` stays unchanged.
</details>

---

### 4. What's wrong?
```js
class Teacher extends Person {
  constructor(name, age, subject) {
    this.subject = subject;
    super(name, age);
  }
}
```
<details><summary>Answer</summary>

`this` is used before `super()`, which throws a **ReferenceError** as soon as you call `new Teacher(...)`. Call `super()` first.
</details>

---

### 5. What does this log?
```js
console.log(ustad.introduce());
```
<details><summary>Answer</summary>

`Hi, my name is Mr. Khan and I'm 45 years old, and I teach Science`
`Teacher` overrides `introduce()` (polymorphism) and calls the parent's version with `super.introduce()`.
</details>

---

### 6. True or false: `ezaan instanceof Person`
<details><summary>Answer</summary>

**True.** `Student extends Person`, so a Student is also a Person.
</details>

---

### 7. What goes wrong if you forget `new`?
```js
const p = PersonOld("Ali", 30);
console.log(p);
```
<details><summary>Answer</summary>

`p` is `undefined` because the function has no `return`. Inside, `this` is the global object in non-strict mode, so it accidentally creates global `name` and `age`. In strict mode it throws a TypeError. (`class` always requires `new`, which is one reason classes are safer.)
</details>

---

### 8. Why put `introduce` on `PersonOld.prototype` instead of inside the constructor as `this.introduce = function () {...}`?
<details><summary>Answer</summary>

On the prototype there's **one** shared copy for all instances. Inside the constructor, every object gets its own copy, which wastes memory.
</details>

---

### 9. Make `count` impossible to change from outside the class.
<details><summary>Answer</summary>

```js
class Person {
  static #count = 0;
  constructor() { Person.#count++; }
  static getCount() { return Person.#count; }
}
```
</details>
