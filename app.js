const taskForm =document.querySelector("#task-form");
const taskInput = document.querySelector("#task-input");
const taskList = document.querySelector("#task-list");

taskForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const taskText = taskInput.value.trim();

    if(taskText === "") {
        return;
    }

const taskItem = document.createElement("li");
taskItem.textContent = taskText;
taskList.append(taskItem);

taskInput.value = "";
});