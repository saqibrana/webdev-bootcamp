// ============================================================
//  Closures Practice — lexical scope, private state, memoization
//  Open index.html in a browser. Check console (F12) too.
// ============================================================

// -------------------------------------------------------
// PART 1 — A Function Remembers Its Scope
// -------------------------------------------------------
// TASK: Write makeGreeter(name) that returns a NEW function.
//   That inner function, when called, returns `Hello, ${name}!`
//   even though `name` is not a parameter of the inner function —
//   it's "closed over" from makeGreeter's scope.
//
// Then, in the click handler, call makeGreeter("Saqib") to get
// the inner function, call it, and show the result in #output-1.

function makeGreeter(name) {
	// YOUR CODE HERE — return a function
	return function () {
		return `Hello, ${name}!`;
	};
}

document.getElementById("btn-greet").addEventListener("click", function () {
	// YOUR CODE HERE
	const output1 = document.getElementById("output-1");
	output1.textContent = makeGreeter("Saqib")();
});

// -------------------------------------------------------
// PART 2 — Independent Counters
// -------------------------------------------------------
// TASK: Write createCounter() that returns a function. Each time
//   the returned function is called, it should increment an
//   internal `count` variable and return the new value.
//
//   Create TWO separate counters (counterA, counterB) from
//   createCounter(). Prove they don't share state — clicking
//   Counter A's button should never change Counter B's number.

function createCounter() {
	// YOUR CODE HERE
	let count = 0;
	return function () {
		return ++count;
	};
}

const counterA = createCounter();
const counterB = createCounter();

document.getElementById("btn-counter-a").addEventListener("click", function () {
	// YOUR CODE HERE — call counterA(), show result in #output-2a
	const output2a = document.getElementById("output-2a");
	output2a.textContent = counterA();
});

document.getElementById("btn-counter-b").addEventListener("click", function () {
	// YOUR CODE HERE — call counterB(), show result in #output-2b
	const output2b = document.getElementById("output-2b");
	output2b.textContent = counterB();
});

// -------------------------------------------------------
// PART 3 — Memoized Expensive Function
// -------------------------------------------------------
// TASK: Write memoize(fn) that returns a wrapped version of fn.
//   The wrapped function should keep a cache (object or Map) of
//   { input: result } closed over between calls.
//   - If the input has been seen before, return the cached result
//     immediately (and note in the output that it was cached).
//   - Otherwise, call fn(input), store the result in the cache,
//     and return it (and note that it was freshly computed).
//
// slowSquare is given — simulate "slow" by just computing normally,
// but your job is to make repeat calls skip re-computing.

function slowSquare(n) {
	return n * n;
}

function memoize(fn) {
	// YOUR CODE HERE — return a function that checks/updates a cache
	const cache = {};
	return function (input) {
		if (input in cache) {
			return `Cached result: ${cache[input]}`;
		}
		const result = fn(input);
		cache[input] = result;
		return `Computed result: ${result}`;
	};
}

const memoizedSquare = memoize(slowSquare);

document.getElementById("btn-memo").addEventListener("click", function () {
	const n = Number(document.getElementById("memo-input").value);
	// YOUR CODE HERE — call memoizedSquare(n), show the result and
	// whether it came from cache in #output-3
	document.getElementById("output-3").textContent = memoizedSquare(n);
});

// -------------------------------------------------------
// PART 4 — Bank Account (Private Balance via Closure)
// -------------------------------------------------------
// TASK: Write createAccount(startingBalance) that returns an object
//   with two methods: { deposit(amount), withdraw(amount) }.
//   The balance itself should be a variable inside createAccount's
//   scope — NOT a property on the returned object — so nothing
//   outside can do `account.balance = 999999` directly.
//   Both methods should return the new balance after the operation.
//   withdraw should refuse (return the balance unchanged) if the
//   amount would take the balance below 0.
//
// Compare this to Person's #balance-style private fields in
// oop-practice/script.js — same goal (encapsulation), different mechanism.

function createAccount(startingBalance) {
	// YOUR CODE HERE — return { deposit, withdraw }
	let balance = startingBalance;

	return {
		deposit(amount) {
			balance += amount;
			return balance;
		},
		withdraw(amount) {
			if (amount > balance) {
				return balance;
			}
			balance -= amount;
			return balance;
		},
	};
}

const account = createAccount(0);

document.getElementById("btn-deposit").addEventListener("click", function () {
	const amount = Number(document.getElementById("amount-input").value);
	// YOUR CODE HERE — call account.deposit(amount), show new balance in #output-4
	document.getElementById("output-4").textContent =
		`Balance: ${account.deposit(amount)}`;
});

document.getElementById("btn-withdraw").addEventListener("click", function () {
	const amount = Number(document.getElementById("amount-input").value);
	// YOUR CODE HERE — call account.withdraw(amount), show new balance in #output-4
	document.getElementById("output-4").textContent =
		`Balance: ${account.withdraw(amount)}`;
});

// -------------------------------------------------------
// PART 5 — The Loop Pitfall
// -------------------------------------------------------
// TASK: Before writing any code, predict on paper what this prints
//   (500ms apart, three lines) if the loop uses `var i`:
//
//     for (var i = 0; i < 3; i++) {
//       setTimeout(() => console.log(i), (i + 1) * 500);
//     }
//
//   Then implement it below using `var` first and run it — check
//   #output-5 against your prediction.
//   Then change `var` to `let` and run again. Note the difference
//   in a comment: why does `let` "just work" here without any
//   extra closure trick, while `var` needs one (e.g. wrapping the
//   body in an IIFE that takes `i` as a parameter)?

document.getElementById("btn-loop").addEventListener("click", function () {
	const output = document.getElementById("output-5");
	output.textContent = "";

	// YOUR CODE HERE

	// for (var i = 0; i < 3; i++) {
	// 	setTimeout(() => (output.textContent += i + "\n"), (i + 1) * 500); // 3
	// }
	for (let i = 0; i < 3; i++) {
		setTimeout(() => (output.textContent += i + "\n"), (i + 1) * 500); // 0, 1, 2 –– This is what we want, because `let` creates a new binding for each iteration of the loop, so each closure captures the correct value of `i`. With `var`, there is only one binding for `i`, so all closures capture the same final value of `i` after the loop ends.
	}
});
