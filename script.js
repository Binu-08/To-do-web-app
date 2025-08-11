// A simple array to store our tasks.
// In a real application, this would be a database or localStorage.
let tasks = [];

// Get references to the HTML elements
const taskTitleInput = document.getElementById('task-title');
const taskDescriptionInput = document.getElementById('task-description');
const saveTaskBtn = document.getElementById('save-task-btn');
const validationMessage = document.getElementById('validation-message');
const pendingTasksList = document.getElementById('pending-tasks-list');
const completedTasksList = document.getElementById('completed-tasks-list');

// Function to render the tasks on the page
function renderTasks() {
    // Clear the current lists
    pendingTasksList.innerHTML = '';
    completedTasksList.innerHTML = '';

    // Loop through the tasks array and create HTML for each one
    tasks.forEach(task => {
        const taskItem = document.createElement('li');
        taskItem.classList.add('task-item');

        if (task.isCompleted) {
            taskItem.classList.add('completed-task');
        }

        taskItem.innerHTML = `
            <div class="task-details">
                <h3>${task.title}</h3>
                <p>${task.description}</p>
            </div>
            <div class="task-actions">
                <button class="complete-btn" data-id="${task.id}">✓</button>
                <button class="delete-btn" data-id="${task.id}">X</button>
            </div>
        `;

        // Add the task to the correct list
        if (task.isCompleted) {
            completedTasksList.appendChild(taskItem);
        } else {
            pendingTasksList.appendChild(taskItem);
        }
    });

    // Add event listeners to the new buttons
    addEventListenersToButtons();
}

// Function to add event listeners for delete and complete buttons
function addEventListenersToButtons() {
    document.querySelectorAll('.delete-btn').forEach(button => {
        button.addEventListener('click', deleteTask);
    });

    document.querySelectorAll('.complete-btn').forEach(button => {
        button.addEventListener('click', toggleCompleteTask);
    });
}

// Function to handle saving a new task
function saveTask() {
    const title = taskTitleInput.value.trim();
    const description = taskDescriptionInput.value.trim();

    // Basic validation
    if (title === '' || description === '') {
        validationMessage.classList.remove('hidden');
        return;
    } else {
        validationMessage.classList.add('hidden');
    }

    // Create a new task object
    const newTask = {
        id: Date.now(), // Use a timestamp for a unique ID
        title: title,
        description: description,
        isCompleted: false,
        dateAdded: new Date().toLocaleString()
    };

    // Add the new task to our array
    tasks.push(newTask);

    // Clear the input fields
    taskTitleInput.value = '';
    taskDescriptionInput.value = '';

    // Re-render the tasks list
    renderTasks();
}

// Function to delete a task
function deleteTask(event) {
    const taskId = parseInt(event.target.dataset.id);
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

// Function to toggle a task's completion status
function toggleCompleteTask(event) {
    const taskId = parseInt(event.target.dataset.id);
    const task = tasks.find(task => task.id === taskId);
    if (task) {
        task.isCompleted = !task.isCompleted;
        renderTasks();
    }
}

// Attach the save function to the save button
saveTaskBtn.addEventListener('click', saveTask);

// Initial render of tasks (in case you had any pre-loaded data)
renderTasks();