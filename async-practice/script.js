// ============================================================
//  Async JS Practice — Call Stack, Event Loop, setTimeout, fetch
//  Open index.html in a browser. Check console (F12) too.
// ============================================================


// -------------------------------------------------------
// PART 1 — Call Stack & Execution Order
// -------------------------------------------------------
// TASK: The three functions below are defined for you.
//   Call them in this order inside the button listener:
//     first(), second(), third()
//   Before running, predict the console output order.
//   Then display the result in #output-1 (one line per message).
//
// Hint: these are all synchronous — no async here yet.

function first() { return "1. first() ran"; }
function second() { return "2. second() ran"; }
function third() { return "3. third() ran"; }

document.getElementById("btn-order").addEventListener("click", function () {
    // YOUR CODE HERE — call all three, collect results, show in #output-1
    const result = `${first()}\n${second()}\n${third()}`;
    document.getElementById("output-1").textContent = result;


});


// -------------------------------------------------------
// PART 2 — setTimeout
// -------------------------------------------------------
// TASK:
//   2a. When the button is clicked, immediately update #output-2 to "Timer started...".
//   2b. After 2 seconds, update #output-2 to "2 seconds have passed!".
//
// Notice: the page stays fully interactive while waiting.

document.getElementById("btn-timer").addEventListener("click", function () {
    // YOUR CODE HERE
    let output2 = document.getElementById("output-2");

    output2.textContent = "Timer started...";
    
    setTimeout(() => {
        output2.textContent = "2 seconds have passed!"
    }, 2000);

});


// -------------------------------------------------------
// PART 3 — Callback Chain (setTimeout inside setTimeout)
// -------------------------------------------------------
// TASK: Simulate a 3-step loading process in #output-3.
//   Step 1 (immediately): show "Connecting..."
//   Step 2 (after 1s):    show "Loading data..."
//   Step 3 (after 2s total): show "Done!"
//
// Use setTimeout inside a setTimeout to chain the steps.
// This pattern is sometimes called "callback hell" — you'll
// see why it's a problem and why Promises were invented to fix it.

document.getElementById("btn-chain").addEventListener("click", function () {
    // YOUR CODE HERE
    let output3 = document.getElementById("output-3");

    output3.textContent = "Connecting...";
    setTimeout(() => {
        output3.textContent = "Loading data...";
        setTimeout(() => {
            output3.textContent = "Done!";
        }, 1000);
    }, 1000);


});


// -------------------------------------------------------
// PART 4 — fetch
// -------------------------------------------------------
// TASK: When the button is clicked:
//   4a. Show "Fetching..." in #output-4.
//   4b. Fetch from: https://jsonplaceholder.typicode.com/users/1
//   4c. Parse the response as JSON (.json() also returns a Promise — chain another .then()).
//   4d. Display the user's name, email, and address.city in #output-4.
//   4e. Also populate the #user-card section:
//         - #user-name  → user.name
//         - #user-email → user.email
//         - #user-city  → user.address.city
//       Then set #user-card's display style to "block" to show it.
//   4f. Chain a .catch() at the end — if anything fails, show "Error fetching data." in #output-4.
//
// The API URL is free and public — no key needed.

document.getElementById("btn-fetch").addEventListener("click", function () {
    // YOUR CODE HERE
    let output4 = document.getElementById("output-4");
    let userCard = document.getElementById("user-card");
    
    output4.textContent = "Fetching...";
    fetch("https://jsonplaceholder.typicode.com/users/1")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            output4.textContent = `${data.name}\n${data.email}\n${data.address.city}`;
            document.getElementById("user-name").textContent = data.name;
            document.getElementById("user-email").textContent = data.email;
            document.getElementById("user-city").textContent = data.address.city;
            userCard.style.display = "block";
        })
        .catch(function(error) {
            output4.textContent = "Error fetching data.";
        });


});


// -------------------------------------------------------
// PART 5 — Event Loop Puzzle
// -------------------------------------------------------
// TASK: Write down A, B, C, D in the order YOU think they'll print.
//       Then fill in the button listener to run this code and
//       display the actual output in #output-5.
//
// The code to run:
//
//   console.log("A");
//   setTimeout(function() { console.log("C"); }, 0);
//   setTimeout(function() { console.log("D"); }, 1000);
//   console.log("B");
//
// Questions to think about:
//   - Why does C print after B even though its delay is 0ms?
//   - What does that tell you about how the event loop works?

document.getElementById("btn-puzzle").addEventListener("click", function () {
    const output = document.getElementById("output-5");
    output.textContent = "";

    // YOUR CODE HERE — run the four lines above and also append each
    // letter to #output-5 as it happens so you can see the order on screen.
    // Hint: use output.textContent += "A\n" etc. inside each log.

    console.log("A");
    output.textContent = "A\n";
    setTimeout(function() { 
        console.log("C");
        output.textContent += "C\n";
    }, 0); // Even with 0ms C still runs after B, it goes through the queue, 0ms means immediately as soon as the call stack is clear 
    setTimeout(function() { 
        console.log("D"); 
        output.textContent += "D\n";
    }, 1000);
    console.log("B");
    output.textContent += "B\n";


});
