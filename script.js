const addBtn = document.getElementById("addBtn");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

window.onload = () => {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => {
        addTaskToList(task.text, task.completed);
    });
};

addBtn.addEventListener("click", () => {
    let given_task = taskInput.value.trim();
    if (given_task === "") return;

    addTaskToList(given_task, false);
    saveTasks();
    taskInput.value = "";
});

function addTaskToList(taskText, isCompleted) {
    let li = document.createElement("li");
    li.innerText = taskText;

    if (isCompleted) {
        li.style.textDecoration = "line-through";
        li.style.color = "gray";
    }

    let completeBtn = document.createElement("button");
    completeBtn.innerText = "✔️";
    completeBtn.style.marginLeft = "10px";

    completeBtn.addEventListener("click", () => {
        li.style.textDecoration = "line-through";
        li.style.color = "gray";
        saveTasks();
    });

    let removeBtn = document.createElement("button");
    removeBtn.innerText = "❌";
    removeBtn.style.marginLeft = "10px";

    removeBtn.addEventListener("click", () => {
        taskList.removeChild(li);
        saveTasks();
    });

    li.appendChild(completeBtn);
    li.appendChild(removeBtn);
    taskList.appendChild(li);
}

function saveTasks() {
    let tasks = [];
    taskList.querySelectorAll("li").forEach(li => {
        tasks.push({
            text: li.firstChild.textContent, 
            completed: li.style.textDecoration === "line-through"
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
