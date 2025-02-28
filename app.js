
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];


function renderTasks() {
  const taskList = document.getElementById("task-list");
  taskList.innerHTML = "";  
  
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.toggle("completed", task.completed);

    li.innerHTML = `
      <span onclick="toggleTaskStatus(${index})">${task.task}</span>
      <div>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });
}


function addTask() {
  const taskInput = document.getElementById("task-input");
  const taskText = taskInput.value.trim();

  if (taskText) {
    const newTask = { task: taskText, completed: false };
    tasks.push(newTask);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    taskInput.value = "";
    renderTasks();
  } else {
    alert("Please enter a task!");
  }
}

function toggleTaskStatus(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}


function deleteTask(index) {
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  renderTasks();
}


function editTask(index) {
  const newTaskText = prompt("Edit task", tasks[index].task);
  if (newTaskText) {
    tasks[index].task = newTaskText;
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}


function clearAllTasks() {
  const confirmation = confirm("Are you sure you want to clear all tasks?");
  if (confirmation) {
    tasks = [];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    renderTasks();
  }
}

renderTasks();
