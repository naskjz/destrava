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
    taskItem.textContent = task.text;
    taskList.append(taskItem);
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