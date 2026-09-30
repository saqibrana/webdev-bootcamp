# Async JS — Quiz

Answer each question **without looking** at `script.js` or `NOTES.md`. Write your answer down, *then* open the answer.

---

### 1. What order does this print in?
```js
setTimeout(() => console.log("A"), 1000);
setTimeout(() => console.log("B"), 500);
console.log("C");
```
<details><summary>Answer</summary>

`C B A`. The sync `C` runs first, then `B` after 500ms, then `A` after 1000ms.
</details>

---

### 2. Why does `setTimeout(fn, 0)` not run `fn` immediately?
<details><summary>Answer</summary>

The callback goes into the task queue. The event loop only moves it to the call stack once **all current synchronous code has finished**.
</details>

---

### 3. (Stretch) What order does this print in?
```js
console.log(1);
setTimeout(() => console.log(2), 0);
Promise.resolve().then(() => console.log(3));
console.log(4);
```
<details><summary>Answer</summary>

`1 4 3 2`. Promise callbacks are **microtasks** and run before `setTimeout` callbacks, which are macrotasks, once the stack is empty.
</details>

---

### 4. You fetch `https://jsonplaceholder.typicode.com/users/99999` (it returns 404). Does your `.catch()` run?
<details><summary>Answer</summary>

**No.** `fetch` only rejects on network errors. A 404 still resolves with `res.ok === false`. You need:
```js
.then(res => {
  if (!res.ok) throw new Error(res.status);
  return res.json();
})
```
</details>

---

### 5. What's wrong here?
```js
fetch(url)
  .then(res => { res.json(); })
  .then(data => console.log(data.name));
```
<details><summary>Answer</summary>

With curly braces, an arrow function needs an explicit `return`. The first `.then` returns `undefined`, so `data` is `undefined` and `data.name` throws a TypeError. Fix it with `res => res.json()` or `{ return res.json(); }`.
</details>

---

### 6. What do `fetch()` and `res.json()` each return?
<details><summary>Answer</summary>

Both return a **Promise**. `fetch()` resolves to a `Response` object, and `res.json()` resolves to the parsed JavaScript object.
</details>

---

### 7. Rewrite Part 3 (Connecting → Loading → Done) with `async/await` instead of nested `setTimeout`.
<details><summary>Answer</summary>

```js
const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

async function runSteps(output) {
  output.textContent = "Connecting...";
  await wait(1000);
  output.textContent = "Loading data...";
  await wait(1000);
  output.textContent = "Done!";
}
```
</details>

---

### 8. While a `setTimeout` of 5 seconds is waiting, can the user still click buttons? Why?
<details><summary>Answer</summary>

Yes. The browser does the waiting, not the JS call stack, so the stack stays free to handle click events.
</details>
