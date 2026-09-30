# Async JS — Cheat Sheet

**In one line:** JavaScript runs one thing at a time (a single call stack). Slow work such as timers and network requests is handed off to the browser, and its callback comes back through a queue once the stack is empty.

## The event loop in 4 steps

1. Synchronous code runs top to bottom on the **call stack**.
2. `setTimeout` or `fetch` hand the waiting over to the browser. JS keeps going.
3. When the wait finishes, the callback goes into a **queue**.
4. The **event loop** moves queued callbacks onto the stack **only when the stack is empty**.

Priority: **sync code → microtasks (Promise `.then`) → macrotasks (`setTimeout`)**

That's why in Part 5 the output is `A B C D`. `C` has a 0ms delay, but it still waits for the stack to clear.

## Syntax to remember

```js
// setTimeout: run once after a delay
setTimeout(() => console.log("later"), 2000);

// Callback chain (gets messy fast, "callback hell")
setTimeout(() => {
  step2();
  setTimeout(() => step3(), 1000);
}, 1000);

// fetch with .then
fetch(url)
  .then(res => res.json())      // .json() ALSO returns a Promise, so return it
  .then(data => show(data))
  .catch(err => showError());

// Same thing with async/await (next thing to practice)
async function loadUser() {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await res.json();
    show(data);
  } catch (err) {
    showError();
  }
}
```

## Watch out (from your own code)

- **`fetch` does NOT reject on 404 or 500.** It only rejects on network failure. Your Part 4 `.catch()` won't run for `/users/99999`. Check `res.ok`.
- **Forgetting `return` inside `.then`.** If you write `.then(res => { res.json(); })` with braces and no `return`, the next `.then` gets `undefined`.
- `setTimeout(fn, 0)` means "as soon as the stack is clear", not "right now".
- Nested `setTimeout` (Part 3) works but doesn't scale. Promises and `async/await` flatten it.

## Where you'll see this in real apps
Loading data from APIs, showing loading spinners, debouncing search inputs, and animations and timers.
