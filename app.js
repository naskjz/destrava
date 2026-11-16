const taskForm = document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

const storageKey = "destrava-tasks";
let tasks = JSON.parse(localStorage.getItem(storageKey) || "[]");

tasks = tasks.map(function (task) {
  if (typeof task === "string") {
    return { text: task, completed: false };
  }

  return task;
});

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach(function (task) {
    const taskItem = document.createElement("li");
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", function () {
      task.completed = checkbox.checked;
      localStorage.setItem(storageKey, JSON.stringify(tasks));
      taskText.classList.toggle("completed", task.completed); 
    });

    const taskText = document.createElement("span");
    taskText.textContent = task.text;
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", function () {
      tasks = tasks.filter(function (currentTask) {
        return currentTask !== task;
        });
    localStorage.setItem(storageKey, JSON.stringify(tasks));
    renderTasks();
    });
    taskText.classList.toggle("completed", task.completed);
    taskItem.append(checkbox, taskText, deleteButton);
    taskList.appendChild(taskItem);
}); 
}
renderTasks();

taskForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const taskText = taskInput.value.trim();

  if (taskText === "") {
    return;
  }

  tasks.push({ text: taskText, completed: false });
  localStorage.setItem(storageKey, JSON.stringify(tasks));
  renderTasks();

  taskInput.value = "";
});