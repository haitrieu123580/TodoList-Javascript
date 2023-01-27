const btnAdd = document.querySelector(".btn-add")
const btnEdit = document.querySelector(".btn-edit")
// const btnDelete = document.querySelector(".icon-delete")
const iconEdit = document.querySelector(".icon-edit")
const statuses = document.querySelectorAll(".status li")
const textInput = document.querySelector(".add-bar input")
const all = statuses[0],
    done = statuses[1],
    undone = statuses[2]
const taskArea = document.querySelector(".tasks")
let isDone = false, isAll = true

// get list of task from local and if it don't have, create empty array
const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
console.log(tasks.length)

function insertTaskHTML(task) {
    let taskHTML;
    if (task.status) {
        taskHTML = `  <div class="task flex-row borderLeft--green">
        <p class="task__name line-through" onclick="changeStatus(${task.id})">${task.content}</p>
        <div class="action flex-row">
            <i class="icon-delete fa-solid fa-trash-can" onclick="deleteTask(${task.id})"></i>
            <i class="icon-edit fa-solid fa-pen-to-square" onclick="updateTask(${task.id})"></i>
        </div>
    </div>`
    }
    else {
        taskHTML = `  <div class="task flex-row borderLeft--red">
        <p class="task__name" onclick="changeStatus(${task.id})">${task.content}</p>
        <div class="action flex-row">
            <i class="icon-delete fa-solid fa-trash-can" onclick="deleteTask(${task.id})"></i>
            <i class="icon-edit fa-solid fa-pen-to-square" onclick="updateTask(${task.id})"></i>
        </div>
    </div>`
    }

    taskArea.insertAdjacentHTML("afterend", taskHTML)
}

// show all tasks
function getAllTasks() {
    if (!tasks) return;
    else return tasks;
}
function showAllTasks() {
    // remove all tasks
    document.querySelectorAll(".task").forEach(task => task.remove())
    // add task html to task area
    tasks.forEach(insertTaskHTML)

}

all.addEventListener('click', () => {
    all.classList.add("status-selected")
    done.classList.remove("status-selected")
    undone.classList.remove("status-selected")
    isAll = true
    showTasks()
})
// show done task
function getDoneTasks() {
    if (!tasks) return;
    return tasks.filter((task) => {
        return task["status"]
    })
}
function showDoneTasks() {
    // remove all tasks
    document.querySelectorAll(".task").forEach(task => task.remove())
    let taskList = getDoneTasks();
    taskList.forEach(insertTaskHTML);

}
done.addEventListener('click', () => {
    done.classList.add("status-selected")
    all.classList.remove("status-selected")
    undone.classList.remove("status-selected")
    isDone = true
    isAll = false
    showTasks()
})
// show undone tasks
function getUndoneTasks() {
    if (!tasks) return;
    return tasks.filter((task) => {
        return !task["status"]
    })
}
function showUndoneTasks() {
    document.querySelectorAll(".task").forEach(task => task.remove())
    let taskList = getUndoneTasks();
    taskList.forEach(insertTaskHTML);
}
undone.addEventListener('click', () => {
    undone.classList.add("status-selected")
    all.classList.remove("status-selected")
    done.classList.remove("status-selected")
    isDone = false
    isAll = false
    showTasks()
})

function showTasks() {
    if (isAll) {
        showAllTasks()
    }
    else {
        if (isDone) {
            showDoneTasks()
        }
        else {
            showUndoneTasks()
        }
    }

}
showTasks()

// add new task to local
btnAdd.addEventListener('click', () => {
    let taskContent = document.querySelector(".add-bar input").value.trim();
    if (taskContent == "") {
        alert("type ur task!")
    }
    else {
        // b/c first id = 0=> new ID = tasks.length
        let newId = tasks.length
        console.log(newId)
        let newTask = {
            "id": newId,
            "content": taskContent,
            "status": false
        }
        tasks.push(newTask)
        localStorage.setItem("tasks", JSON.stringify(tasks))
        isAll = true
        showTasks()
    }
    console.log(taskContent)
})

// delete task 
function deleteTask(taskId) {
    tasks.splice(taskId, 1)
    localStorage.setItem("tasks", JSON.stringify(tasks))
    showTasks()
}

// change status 
function changeStatus(taskId) {
    // find the task
    let task = tasks.find(task => task.id == taskId)
    if (task.status) {
        task.status = false
        insertTaskHTML(task)
    }
    else {
        task.status = true
        insertTaskHTML(task)
    }
    // show list task after change
    showTasks()
}

//  update task 
function updateTask(taskId) {
    let task = tasks.find(task => task.id == taskId)
    btnEdit.style.display = "inline-block"
    btnAdd.style.display = "none"
    textInput.value = task.content
    btnEdit.addEventListener("click", () => {
        let newContent = textInput.value.trim()
        task.content = newContent
        console.log(task)
        localStorage.setItem("tasks", JSON.stringify(tasks))
        showTasks()
        btnAdd.style.display = "inline-block"
        btnEdit.style.display = "none"
    })

}

