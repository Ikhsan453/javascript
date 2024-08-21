//js

const input = document.querySelector('input');
const btn = document.querySelector('.addTask > button');
const notCompleted = document.querySelector('.notCompleted');
const Completed = document.querySelector('.Completed');

btn.addEventListener('click', addList);
input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) addList(e);
});

// Function to add a new list item
function addList(e) {
    if (input.value.trim() === '') return; // Do nothing if input is empty

    const newLi = document.createElement('li');
    const checkBtn = document.createElement('button');
    const delBtn = document.createElement('button');

    checkBtn.innerHTML = '<i class="fa fa-check"></i>';
    delBtn.innerHTML = '<i class="fa fa-trash"></i>';

    newLi.textContent = input.value;
    input.value = '';
    newLi.appendChild(checkBtn);
    newLi.appendChild(delBtn);

    // Append new task to the notCompleted list
    notCompleted.appendChild(newLi);

    // Add event listeners for check and delete buttons
    checkBtn.addEventListener('click', () => markAsCompleted(newLi, checkBtn));
    delBtn.addEventListener('click', () => deleteTask(newLi));

    // Save tasks to local storage
    saveTasks();
}

// Function to mark task as completed
function markAsCompleted(taskElement, checkBtn) {
    Completed.appendChild(taskElement);
    checkBtn.style.display = 'none';
    saveTasks();
}

// Function to delete a task
function deleteTask(taskElement) {
    taskElement.remove();
    saveTasks();
}

// Function to save tasks to local storage
function saveTasks() {
    const tasks = {
        notCompleted: Array.from(notCompleted.children).map(li => li.textContent.trim()),
        completed: Array.from(Completed.children).map(li => li.textContent.trim())
    };
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'));

    if (storedTasks) {
        storedTasks.notCompleted.forEach(task => {
            const newLi = document.createElement('li');
            const checkBtn = document.createElement('button');
            const delBtn = document.createElement('button');

            checkBtn.innerHTML = '<i class="fa fa-check"></i>';
            delBtn.innerHTML = '<i class="fa fa-trash"></i>';

            newLi.textContent = task;
            newLi.appendChild(checkBtn);
            newLi.appendChild(delBtn);
            notCompleted.appendChild(newLi);

            checkBtn.addEventListener('click', () => markAsCompleted(newLi, checkBtn));
            delBtn.addEventListener('click', () => deleteTask(newLi));
        });

        storedTasks.completed.forEach(task => {
            const newLi = document.createElement('li');
            const checkBtn = document.createElement('button');
            const delBtn = document.createElement('button');

            checkBtn.innerHTML = '<i class="fa fa-check"></i>';
            checkBtn.style.display = 'none';
            delBtn.innerHTML = '<i class="fa fa-trash"></i>';

            newLi.textContent = task;
            newLi.appendChild(checkBtn);
            newLi.appendChild(delBtn);
            Completed.appendChild(newLi);

            delBtn.addEventListener('click', () => deleteTask(newLi));
        });
    }
}

// Load tasks when the page is loaded
document.addEventListener('DOMContentLoaded', loadTasks);
