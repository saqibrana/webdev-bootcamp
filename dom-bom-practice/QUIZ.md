# DOM & BOM — Quiz

Answer each question **without looking** at `script.js` or `NOTES.md`. Write your answer down, *then* open the answer.

---

### 1. What happens here?
```js
document.getElementsByClassName("fruit").forEach(f => console.log(f));
```
<details><summary>Answer</summary>

**TypeError: forEach is not a function.** `getElementsByClassName` returns an `HTMLCollection`, which has no `forEach`. Use `querySelectorAll(".fruit")` or `Array.from(...)`.
</details>

---

### 2. A user types `<img src=x onerror=alert(1)>` into the task input. What's the difference between `li.textContent = value` and `li.innerHTML = value`?
<details><summary>Answer</summary>

`textContent` shows it as plain text, which is safe. `innerHTML` turns it into a real element and **runs the script**, which is an XSS vulnerability. Always use `textContent` for user input.
</details>

---

### 3. You change your delete handler to an arrow function. What breaks?
```js
deleteButton.addEventListener("click", () => {
  this.parentElement.remove();
});
```
<details><summary>Answer</summary>

Arrow functions don't get their own `this`. Here `this` is `window` (or `undefined` in a module), so `this.parentElement` is `undefined` and `.remove()` throws. Use `(e) => e.target.parentElement.remove()`.
</details>

---

### 4. Why doesn't this work?
```js
box.style.background-color = "coral";
```
<details><summary>Answer</summary>

JS reads `-` as minus, so this is a syntax error. Use camelCase: `box.style.backgroundColor`.
</details>

---

### 5. What's wrong with this counter?
```js
btn.addEventListener("click", () => {
  let count = 0;
  count++;
  display.textContent = count;
});
```
<details><summary>Answer</summary>

`count` is re-created as 0 on every click, so it always shows `1`. Declare it **outside** the listener.
</details>

---

### 6. Rewrite the task list so there's only ONE click listener for all delete buttons (event delegation).
<details><summary>Answer</summary>

```js
document.getElementById("task-list").addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") {
    e.target.parentElement.remove();
  }
});
```
It also works for `<li>`s added later, because the listener is on the parent.
</details>

---

### 7. What does `confirm("Leave?")` return, and what does `alert("Hi")` return?
<details><summary>Answer</summary>

`confirm` returns `true` (OK) or `false` (Cancel). `alert` returns `undefined`.
</details>

---

### 8. You get `TypeError: Cannot read properties of null (reading 'textContent')`. What's the first thing you check?
<details><summary>Answer</summary>

Whether the selector or id is spelled correctly and the element exists. Also check that the script runs **after** the HTML has loaded (put the script at the end of `<body>` or use `defer`).
</details>
