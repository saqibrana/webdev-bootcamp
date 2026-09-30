# DOM & BOM — Cheat Sheet

**In one line:** the **DOM** is the page's HTML as JavaScript objects you can read and change. The **BOM** is everything around the page: the window, the URL, dialogs, scrolling.

## Selecting

| Method | Returns | Notes |
|---|---|---|
| `getElementById("x")` | one element or `null` | fastest, no `#` |
| `querySelector(".x")` | first match or `null` | any CSS selector |
| `querySelectorAll(".x")` | static `NodeList` | has `.forEach` |
| `getElementsByClassName("x")` | **live** `HTMLCollection` | **no** `.forEach`, use `Array.from()` |

## Changing things

```js
el.textContent = "Safe text";          // plain text (safe for user input)
el.innerHTML = "<b>HTML</b>";          // parses HTML (never use with user input)
img.src = "...";                       // attributes are properties
el.classList.add("highlight");         // also .remove / .toggle / .contains
el.style.backgroundColor = "coral";    // camelCase, not background-color
```

## Creating and removing

```js
const li = document.createElement("li");
li.textContent = "Task";
list.appendChild(li);   // or list.append(li)
li.remove();
```

## Events

```js
btn.addEventListener("click", function () {
  this;        // the button (regular function)
});
btn.addEventListener("click", (e) => {
  e.target;    // use this in arrow functions, because `this` is NOT the button
});
```

**Event delegation:** put one listener on the parent instead of one on each child.
```js
taskList.addEventListener("click", (e) => {
  if (e.target.tagName === "BUTTON") e.target.parentElement.remove();
});
```

## BOM quick list

```js
window.innerWidth / window.innerHeight
window.scrollTo({ top: 0, behavior: "smooth" })
confirm("Sure?")        // returns true / false
alert("Hi")             // returns nothing
window.location.href = "https://..."   // navigate
```

## Watch out (from your own code)

- Your delete button uses `this.parentElement`, which only works because it's a **regular function**. Change it to an arrow function and `this` breaks. `e.target.parentElement` works in both.
- In Part 5, `count` has to be declared **outside** the listeners. Inside, it would reset to 0 on every click.
- `getElementById` returns `null` if the id is wrong. `null.textContent` gives "Cannot read properties of null", which almost always means a typo in the id.

## Where you'll see this in real apps
Every to-do list, form validation, modal, dropdown, and "back to top" button. Frameworks like React do this for you, but they're doing exactly this underneath.
