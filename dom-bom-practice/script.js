// ============================================================
//  DOM & BOM Practice Exercise
//  Open index.html in a browser, then solve each part below.
//  Check the browser console (F12) for output.
// ============================================================


// -------------------------------------------------------
// PART 1 — Selecting & Reading Elements
// -------------------------------------------------------
// TASKS:
//   1a. Select the <p> with id "intro-text" and log its text content.
//   1b. Select ALL elements with class "fruit" and log how many there are.
//   1c. Loop through the fruit elements and log each one's text.

document.getElementById("btn-read").addEventListener("click", function () {
    // 1a — YOUR CODE HERE
    console.log(document.getElementById("intro-text").textContent);


    // 1b — YOUR CODE HERE
    const fruits = document.querySelectorAll(".fruit");
    console.log(fruits.length);


    // 1c — YOUR CODE HERE
    fruits.forEach(fruit => {
        console.log(fruit.textContent);
    });



});


// --s-----------------------------------------------------
// PART 2 — Modifying Content & Attributes
// -------------------------------------------------------
// TASKS:
//   2a. Change the text of the <h3 id="main-heading"> to "DOM is awesome!"
//   2b. Change the img src to "https://placebear.com/200/150" (taller bear).
//   2c. Add the CSS class "highlight" to the heading.

document.getElementById("btn-modify").addEventListener("click", function () {
    // 2a — YOUR CODE HERE
    const mainHeading = document.getElementById("main-heading");
    mainHeading.textContent = "DOM is awesome!";

    // 2b — YOUR CODE HERE
    document.getElementById("demo-img").src = "https://placebear.com/200/150";


    // 2c — YOUR CODE HERE
    mainHeading.classList.add("highlight");


});


// -------------------------------------------------------
// PART 3 — Styling
// -------------------------------------------------------
// TASKS:
//   3a. Change the background color of #color-box to "coral".
//   3b. Change its width and height to 200px each.
//   3c. Add a border: "3px solid black".

document.getElementById("btn-style").addEventListener("click", function () {
    // 3a — YOUR CODE HERE
    const colorBox = document.getElementById("color-box");
    colorBox.style.backgroundColor = "coral";


    // 3b — YOUR CODE HERE
    colorBox.style.width = "200px";
    colorBox.style.height = "200px";


    // 3c — YOUR CODE HERE
    colorBox.style.border = "3px solid black";


});


// -------------------------------------------------------
// PART 4 — Creating & Removing Elements
// -------------------------------------------------------
// TASKS:
//   4a. When "Add Task" is clicked, read the value from #task-input.
//   4b. If the input is empty, alert "Please enter a task!" and stop.
//   4c. Create a new <li> element, set its text to the input value.
//   4d. Add a "Delete" button inside the <li>.
//         When the Delete button is clicked, remove the <li> from the list.
//   4e. Append the <li> to #task-list, then clear the input field.

document.getElementById("btn-add-task").addEventListener("click", function () {
    // YOUR CODE HERE
    const taskInput = document.getElementById("task-input");
    if (!taskInput.value.trim()) {
        alert("Please enter a task!");
    } else {
        const taskList = document.getElementById("task-list");
        const newListItem = document.createElement("li");
        const deleteButton = document.createElement("button");
        newListItem.textContent = taskInput.value;
        deleteButton.textContent = "Delete";
        newListItem.appendChild(deleteButton);
        deleteButton.addEventListener("click", function () {
            this.parentElement.remove();
        })
        taskList.appendChild(newListItem);
        taskInput.value = "";
    }

});


// -------------------------------------------------------
// PART 5 — Events (Counter)
// -------------------------------------------------------
// TASKS:
//   5a. Keep a counter variable (starts at 0).
//   5b. +1 button increases the counter and updates #counter-display.
//   5c. -1 button decreases it (don't let it go below 0).
//   5d. Reset button sets it back to 0.
//   BONUS: Make the number turn red when it reaches 10 or above,
//          and green when it's 0.

// YOUR CODE HERE (declare counter variable here, outside the listeners)
const counterDisplay = document.getElementById("counter-display");
let count = 0;

function updateDisplay() {
    counterDisplay.textContent = count;
    if (count >= 10) counterDisplay.style.color = "red";
    else if (count === 0) counterDisplay.style.color = "green";
    else counterDisplay.style.color = "black";
}

document.getElementById("btn-increment").addEventListener("click", function () {
    // YOUR CODE HERE
    count++;
    updateDisplay();
});

document.getElementById("btn-decrement").addEventListener("click", function () {
    // YOUR CODE HERE
    if (count === 0) return;
    count--;
    updateDisplay();
});

document.getElementById("btn-reset").addEventListener("click", function () {
    // YOUR CODE HERE
    count = 0;
    updateDisplay();
});


// -------------------------------------------------------
// PART 6 — BOM (Browser Object Model)
// -------------------------------------------------------
// TASKS:
//   6a. "Show Window Size" button: display the window's inner width and
//       height in the #bom-output paragraph.
//       e.g. "Window: 1440 x 900"
//   6b. "Scroll to Top" button: smoothly scroll the page back to the top.
//       Hint: look up window.scrollTo()
//   6c. "Confirm Dialog" button: show a confirm() dialog asking
//       "Are you sure you want to leave?".
//       If the user clicks OK, set window.location.href to "https://google.com".
//       If Cancel, write "Cancelled." into #bom-output.

const bomOutput = document.getElementById("bom-output");

document.getElementById("btn-window-size").addEventListener("click", function () {
    // YOUR CODE HERE
    bomOutput.textContent = `Window: ${window.innerWidth} x ${window.innerHeight}`;
});

document.getElementById("btn-scroll-top").addEventListener("click", function () {
    // YOUR CODE HERE
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
});

document.getElementById("btn-confirm").addEventListener("click", function () {
    // YOUR CODE HERE
    if (confirm("Are you sure you want to leave?")) {
        window.location.href = "https://google.com";
    } else {
        bomOutput.textContent = "Cancelled.";
    }
});
