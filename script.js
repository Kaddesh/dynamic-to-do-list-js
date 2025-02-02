document.addEventListener("DOMContentLoaded", function () {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        createTaskElement(taskText);
        saveTaskToStorage(taskText);

        taskInput.value = ""; // Clear input
    }

    // Function to create and add a new task element
    function createTaskElement(taskText) {
        // Create list item
        const taskItem = document.createElement("li");
        taskItem.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        removeButton.onclick = function () {
            taskList.removeChild(taskItem);
            removeTaskFromStorage(taskText);
        };

        // Append button to the task item
        taskItem.appendChild(removeButton);

        // Add task item to the list
        taskList.appendChild(taskItem);
    }

    // Function to save a task to Local Storage
    function saveTaskToStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskText);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = tasks.filter(function (task) {
            return task !== taskText;
        });
        localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    }

    // Function to load tasks from Local Storage on page load
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(function (task) {
            createTaskElement(task);
        });
    }

    // Attach event listeners
    addButton.addEventListener("click", function () {
        addTask();
    });

    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Load tasks from Local Storage when the page loads
    loadTasks();
});
