'use strict';

// Get elements
// ByClassName returns an array
const taskContainer = document.getElementsByClassName('task-container')[0];

const tasks = [];
let idCounter = 0;

document
  .getElementById('task-form')
  .addEventListener('submit', function (event) {
    // Prevent refresh
    event.preventDefault();
    // Get Form Data
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());
    // Clear Input
    document.getElementById('task').value = '';
    const task = formObject.task;
    // Confirm task there
    console.log(task);
    // Add task
    const taskObject = { id: idCounter, task, isComplete: false };
    idCounter++;
    tasks.push(taskObject);
    // Confirm tasks
    console.log(tasks);
    // Update UI
    displayTasks(tasks);
  });

// Functions
function displayTasks(tasks) {
  // Clear the task container
  taskContainer.innerHTML = '';

  // Check if there are any tasks
  if (tasks.length === 0) {
    taskContainer.innerHTML = '<p>No tasks available. Add a new task!</p>';
    return;
  }

  // Loop through the tasks array and create HTML elements for each task
  tasks.forEach(task => {
    const taskHTML = `
        <p>${task.task}</p>
        <button class="edit-btn" onclick='editTask(${task.id})'>✏ Edit</button>
        <button class="complete-btn" onclick='markComplete(${task.id})'>✔ Complete</button>
        <button class="remove-btn" onclick='deleteTask(${task.id})'>🗑 Delete</button>
      `;

    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    if (task.isComplete) {
      taskElement.classList.add('completed');
    }
    taskElement.innerHTML = taskHTML;
    taskContainer.appendChild(taskElement);
  });
}

function deleteTask(id) {
  // task we want to delete
  const taskToDelete = tasks.find(task => task.id === id);
  // get index of Delete element
  const deleteIndex = tasks.indexOf(taskToDelete);
  // remove only one element
  tasks.splice(deleteIndex, 1);
  // update UI
  displayTasks(tasks);
  // We could have used id directly but if we had deleted some tasks id wouldnt match index anymore
}

function editTask(id) {
  // task we want to edit
  const taskToEdit = tasks.find(task => task.id === id);
  // pop up with new paragraph
  // set task with new paragraph
  // update UI
  displayTasks(tasks);
}

function markComplete(id) {
  // Find Task
  const completedTask = tasks.find(task => task.id === id);
  // Update Status
  completedTask.isComplete = true;
  // Update UI
  displayTasks(tasks);
}
