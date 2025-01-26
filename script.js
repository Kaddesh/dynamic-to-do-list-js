document.addEventListener("DOMContentLoaded", function () {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Load tasks from Local Storage and display them
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(function (task) {
            createTaskElement(task);
        });
    }

    // Save tasks to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Create a new task element and add it to the list
    function createTaskElement(taskText) {
        // Create list item
        const taskItem = document.createElement("li");
        taskItem.textContent = taskText;

        // Create remove button
        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        // Add remove functionality
        removeButton.onclick = function () {
            taskList.removeChild(taskItem);
            removeTaskFromStorage(taskText);
        };

        // Append button to the task item
        taskItem.appendChild(removeButton);

        // Add task item to the list
        taskList.appendChild(taskItem);
    }

    // Add a new task to the list and Local Storage
    function addTask() {
        const taskText = taskInput.value.trim();

        // Validate input
        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create task element and save it
        createTaskElement(taskText);

        // Update Local Storage
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskText);
        saveTasks(tasks);

        // Clear input field
        taskInput.value = "";
    }

    // Remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = tasks.filter(function (task) {
            return task !== taskText;
        });
        saveTasks(updatedTasks);
    }

    // Event listener for adding a task when clicking the button
    addButton.addEventListener("click", function () {
        addTask();
    });

    // Event listener for adding a task when pressing the Enter key
    taskInput.addEventListener("keypress", function (event) {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Load tasks when the page loads
    loadTasks();
});
