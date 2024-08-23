'use strict';

// Get elements

// ByClassName returns an array
const taskContainer = document.getElementsByClassName('task-container')[0];
// Initial Values
const tasks = [];
let idCounter = 0;
let currentTab = 'All';
// Form event listener
document.getElementById('task-form').addEventListener('submit', event => {
  // Prevent refresh
  event.preventDefault();
  // Get Form Data
  const formData = new FormData(event.target);
  const formObject = Object.fromEntries(formData.entries());
  // Clear Input
  document.getElementById('task').value = '';
  const task = formObject.task;
  // Add task
  const taskObject = { id: idCounter, task, isComplete: false };
  idCounter++;
  tasks.push(taskObject);
  // Update UI
  displayTasks(tasks);
});

// Functions
function displayTasks(tasks) {
  // Clear the task container
  taskContainer.innerHTML = '';
  // default 'All'
  let filteredTasks = tasks;

  if (currentTab === 'Active') {
    filteredTasks = tasks.filter(task => !task.isComplete);
  }

  if (currentTab === 'Completed') {
    filteredTasks = tasks.filter(task => task.isComplete);
  }

  // Loop through the tasks array and create HTML elements for each task
  filteredTasks.forEach(task => {
    const taskHTML = `
  <p>${task.task}</p>
  ${
    task.isComplete
      ? `<button class="complete-btn" onclick='toggleComplete(${task.id})'>❌ Mark as Incomplete</button>`
      : `<button class="edit-btn" onclick='editTask(${task.id})'>✏️ Edit</button>
     <button class="complete-btn" onclick='toggleComplete(${task.id})'>✔️ Mark as Complete</button>`
  }
  <button class="remove-btn" onclick='deleteTask(${task.id})'>🗑️ Delete</button>
`;
    // Create new Element
    const taskElement = document.createElement('div');
    // Add Classes
    taskElement.classList.add('task');
    if (task.isComplete) {
      taskElement.classList.add('completed');
    }
    // add HTML inside div
    taskElement.innerHTML = taskHTML;
    // Put it inside taskContainer div
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
  const newTask = prompt('Please enter the new task');
  // Null Check
  if (newTask === null || newTask.trim() === '') {
    return;
  }
  // set task with new paragraph
  taskToEdit.task = newTask;
  // update UI
  displayTasks(tasks);
}

function toggleComplete(id) {
  // Find Task
  const task = tasks.find(task => task.id === id);
  // Reverse isComplete
  task.isComplete = !task.isComplete;
  // Update UI
  displayTasks(tasks);
}

function setTab(tab = 'All') {
  // Set Global variable to tab
  currentTab = tab;
  // Get all buttons and remove active-tab then if it isn't currentTab
  document.querySelectorAll('.filter-btn').forEach(button => {
    if (button.textContent.trim() === currentTab) {
      button.classList.add('active-tab');
    } else {
      button.classList.remove('active-tab');
    }
  });
  // Update UI
  displayTasks(tasks);
}
