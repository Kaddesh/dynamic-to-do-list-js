document.addEventListener("DOMContentLoaded", () => {
    // Select DOM elements
    const addButton = document.getElementById("add-task-btn");
    const taskInput = document.getElementById("task-input");
    const taskList = document.getElementById("task-list");

    // Retrieve tasks from Local Storage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach((task) => createTaskElement(task));
    }

    // Save tasks to Local Storage
    function saveTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Create a new task element
    function createTaskElement(taskText) {
        const taskItem = document.createElement("li");
        taskItem.textContent = taskText;

        const removeButton = document.createElement("button");
        removeButton.textContent = "Remove";
        removeButton.className = "remove-btn";

        // Remove task on button click
        removeButton.onclick = () => {
            taskList.removeChild(taskItem);
            removeTaskFromStorage(taskText);
        };

        taskItem.appendChild(removeButton);
        taskList.appendChild(taskItem);
    }

    // Add a new task
    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

        // Create the task element
        createTaskElement(taskText);

        // Save the task in Local Storage
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(taskText);
        saveTasks(tasks);

        // Clear the input field
        taskInput.value = "";
    }

    // Remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        const updatedTasks = tasks.filter((task) => task !== taskText);
        saveTasks(updatedTasks);
    }

    // Attach event listeners
    addButton.addEventListener("click", addTask);

    taskInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTask();
        }
    });

    // Load tasks when the page loads
    loadTasks();
});
