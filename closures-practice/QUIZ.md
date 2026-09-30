# Closures — Quiz

Answer each question **without looking** at `script.js` or `NOTES.md`. Write your answer down, *then* open the answer.

---

### 1. What gets logged?
```js
function outer() {
  let x = 10;
  return function () { x++; return x; };
}
const f = outer();
f();
console.log(f());
const g = outer();
console.log(g());
```
<details><summary>Answer</summary>

`12` then `11`.
`f` has its own `x` that went 10 → 11 → 12. `g` came from a **new** call to `outer()`, so it got a fresh `x = 10` and returns 11.
</details>

---

### 2. What gets logged, and why?
```js
for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log(i), 100);
}
```
<details><summary>Answer</summary>

`3 3 3`. `var` is function-scoped, so there is only **one** `i`. By the time the timeouts run, the loop has finished and `i` is 3.
With `let`, each iteration gets its own `i`, so it prints `0 1 2`.
</details>

---

### 3. Fix question 2 **without** changing `var` to `let`.
<details><summary>Answer</summary>

```js
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}
```
The IIFE creates a new scope per iteration, and `j` captures the current value.
</details>

---

### 4. What gets logged?
```js
const acc = createAccount(100);   // your version from script.js
acc.balance = 999;
console.log(acc.deposit(10));
```
<details><summary>Answer</summary>

`110`. `acc.balance = 999` only adds a new, unrelated property to the object. The real `balance` lives inside the closure and can't be touched from outside.
</details>

---

### 5. What does `acc.withdraw(-50)` return if the balance is 100?
<details><summary>Answer</summary>

`150`. `-50 > 100` is false, so it runs `balance -= -50`. That's a bug. Add a guard such as `if (amount <= 0) return balance;`.
</details>

---

### 6. Using your `memoize`, what does the second line return?
```js
memoizedSquare(4);
memoizedSquare("4");
```
<details><summary>Answer</summary>

`"Cached result: 16"`. Object keys are converted to strings, so `4` and `"4"` are the same key. A `Map` would keep them separate.
</details>

---

### 7. Write `once(fn)`: a wrapper that runs `fn` only the first time and returns the first result on every later call.
<details><summary>Answer</summary>

```js
function once(fn) {
  let called = false;
  let result;
  return function (...args) {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}
```
</details>

---

### 8. In your own words: why do `counterA` and `counterB` not share `count`?
<details><summary>Answer</summary>

Each call to `createCounter()` runs the function body again and creates a **new** `let count = 0`. Each returned function closes over its own copy.
</details>
