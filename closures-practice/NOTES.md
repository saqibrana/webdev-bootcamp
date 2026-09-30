# Closures — Cheat Sheet

**In one line:** a function remembers the variables from the place where it was *created*, even after that outer function has finished running.

## Key ideas

| Idea | Your example (`script.js`) |
|---|---|
| Inner function keeps access to outer variables | `makeGreeter(name)` returns a function that still knows `name` |
| Each call to the outer function = a fresh, separate scope | `counterA` and `counterB` never share `count` |
| Closure as a private cache | `memoize(fn)` keeps `cache` alive between calls |
| Closure as private data (encapsulation) | `createAccount()` — `balance` is not a property, so nobody can overwrite it |
| `let` in loops creates a new binding per iteration | Part 5: `let` prints `0 1 2`, `var` prints `3 3 3` |

## Patterns to remember

```js
// 1. Factory that returns a function
function createCounter() {
  let count = 0;             // private
  return () => ++count;      // closes over count
}

// 2. Factory that returns an object of methods (module pattern)
function createAccount(start) {
  let balance = start;
  return {
    deposit(a) { balance += a; return balance; },
    withdraw(a) { if (a > balance) return balance; balance -= a; return balance; },
  };
}

// 3. var-in-loop fix without let (IIFE)
for (var i = 0; i < 3; i++) {
  (function (j) {
    setTimeout(() => console.log(j), 100);
  })(i);
}
```

## Watch out (from your own code)

- **`withdraw(-50)` adds money.** `createAccount` never checks for negative or non-number amounts. `deposit(-50)` also removes money. A real version should reject `amount <= 0`.
- **Object keys are always strings.** In `memoize`, `cache[2]` and `cache["2"]` are the same key. Use a `Map` when the type matters.
- `makeGreeter("Saqib")` returns a **function**, and `makeGreeter("Saqib")()` returns the **string**. That extra `()` is easy to forget.

## Closure vs `#private` (compare with `oop-practice/script.js`)

| | Closure (`createAccount`) | Class `#field` (`Person`) |
|---|---|---|
| Privacy | Variable is only reachable from inner functions | Only reachable from inside the class body |
| Methods | Copied per object | Shared on the prototype |
| Use when | Small modules, callbacks, one-off state | Many instances, inheritance |

## Where you'll see this in real apps
Event handlers that remember state, debounce/throttle, React hooks (`useState` is built on closures), and memoization and caching.
