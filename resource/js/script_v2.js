
// show edit form
const btnEdit = document.querySelector(".btn-edit"),
    btnDel = document.querySelector(".btn-delete"),
    btnAdd = document.querySelector(".btn-add"),
    form = document.querySelector(".form"),
    choose = document.querySelector(".choose-status"),
    formTitle = document.querySelector(".form-title h1"),
    todoTasks = document.querySelector(".tasks--todo"),
    doingTasks = document.querySelector(".tasks--doing"),
    finishedTasks = document.querySelector(".tasks--finished"),
    todoNumber = document.querySelector(".tasks:nth-child(1) .tasks-status span"),
    doingNumber = document.querySelector(".tasks:nth-child(2) .tasks-status span"),
    finishedNumber = document.querySelector(".tasks:nth-child(3) .tasks-status span");
var categoryTxt = document.getElementById("category"),
    titleTxt = document.getElementById("title"),
    contentTxt = document.getElementById("content"),
    status = document.querySelectorAll(".status");
let isUpdate = false, updateId;
function showForm() {
    let bg = document.querySelector(".bg-filter")
    let form = document.querySelector(".form")
    bg.classList.add("visible")
    form.classList.add("visible")
}
const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
// get tasks by status
function getTodoTasks() {
    if (!tasks) return;
    return tasks.filter((task) => {
        return task["status"] == "todo"
    })
}
function getDoingTasks() {
    if (!tasks) return;
    return tasks.filter((task) => {
        return task["status"] == "doing"
    })
}
function getFinishedTasks() {
    if (!tasks) return;
    return tasks.filter((task) => {
        return task["status"] == "finished"
    })
}
function getAllTasks() {
    if (!tasks) return;
    return tasks
}
// show taskes
function insertTaskHTML(task,id) {

    let taskHTML = ` <div class="task">
    <div class="task-top row">
        <div class="task-info">
            <div class="task-category">${task.category}</div>
            <div class="task-title">
            ${task.title}
            </div>
        </div>
        <div class="task-action row">
            <i class="fa-solid fa-pen btn-edit" onclick="updateTask(${id},'${task.category}','${task.title}','${task.content}','${task.status}')"></i>
            <i class="fa-solid fa-trash btn-delete"onclick="deleteTask(${id})" ></i>
        </div>
    </div>
    <div class="task-bottom">
        <div class="task-content">
        ${task.content}
        </div>
        <div class="task-time">
            <i class="fa-regular fa-clock"></i>
            ${task.date}
        </div>
    </div>
</div>`

    if (task.status == "todo") {
        todoTasks.insertAdjacentHTML("afterend", taskHTML);
    }

    else if (task.status == "doing") {
        doingTasks.insertAdjacentHTML("afterend", taskHTML);
    }
    else {
        finishedTasks.insertAdjacentHTML("afterend", taskHTML);
    }

}
function showTasks() {
    document.querySelectorAll(".task").forEach(task => task.remove())
    tasks.forEach((task, id) =>{
        insertTaskHTML(task,id)
    })
    todoNumber.innerText = getTodoTasks().length
    doingNumber.innerText = getDoingTasks().length
    finishedNumber.innerText = getFinishedTasks().length
}
showTasks()
function deleteTask(taskId) {
        tasks.splice(taskId, 1)
        localStorage.setItem("tasks", JSON.stringify(tasks))
       showTasks()
}
const btnSubmit = document.querySelector("#btn-submit");
// !
btnAdd.addEventListener("click", () => {
    showEditForm("")
})
let engine = (id) => {
    if (id.value.trim() === "") {
        id.style.border = "1px solid red";
        return false
    } else {

        id.style.border = "1px solid green";
        return true
    }
};
function resetForm() {
    document.getElementById("category").value = "";
    document.getElementById("title").value = ""
    document.getElementById("content").value = ""
    document.getElementById("title").style.border = "1px solid black"
    document.getElementById("category").style.border = "1px solid black"
    document.getElementById("content").style.border = "1px solid black"
}
function closeForm() {
    resetForm()
    isUpdate = false
    let bg = document.querySelector(".bg-filter")
    let form = document.querySelector(".form")
    bg.classList.remove("visible")
    form.classList.remove("visible")
    formTitle.innerHTML = "Add new todo"
    choose.classList.remove("visible")
}
function showEditForm(taskId,category, title, content,status) {
    showForm()
    if (taskId !== "") {
        formTitle.innerHTML = "Edit todo"
        choose.classList.add("visible")
        document.getElementById("category").value =category
        document.getElementById("title").value = title
        document.getElementById("content").value = content
        var ele = document.querySelectorAll('.choose-status input');
        for (i = 0; i < ele.length; i++) {
            if (ele[i].type = "radio") {

                if (ele[i].value == status) {
                    ele[i].checked = true
                }

            }
        }
    }
}
function updateTask(taskId,category,title,content, status) {
    console.log(taskId)
    updateId = taskId;
    isUpdate = true;
    showEditForm(taskId,category,title,content, status)

}

btnSubmit.addEventListener("click", (e) => {
    e.preventDefault()
    var isTrue1 = engine(document.getElementById("category")),
        isTrue2 = engine(document.getElementById("title")), isTrue3 = engine(document.getElementById("content"))
    // is valid
    
    if (isTrue1 && isTrue2 && isTrue3) {
        let date = new Date()
        let newTask = {
            // id: tasks.length,
            category: document.getElementById("category").value.trim(),
            title: document.getElementById("title").value.trim(),
            content: document.getElementById("content").value.trim(),
            status: 'todo',
            date: `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`
        }

       if(!isUpdate){
        tasks.push(newTask)
       } 
       else{
        isUpdate = false
        if (document.getElementById('todo').checked) {
            newTask.status = document.getElementById('todo').value;
        }
        else if (document.getElementById('doing').checked) {
            newTask.status = document.getElementById('doing').value;
        }
        else if (document.getElementById('finished').checked) {
            newTask.status = document.getElementById('finished').value;
        }
        tasks[updateId] = newTask
       }
       localStorage.setItem("tasks",JSON.stringify(tasks))
       showTasks();
       closeForm();
    }
})