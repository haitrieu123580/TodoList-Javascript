function showForm() {
    let bg = document.querySelector(".bg-filter")
    let form = document.querySelector(".form")
    bg.classList.add("visible")
    form.classList.add("visible")
}
function closeForm() {
    let bg = document.querySelector(".bg-filter")
    let form = document.querySelector(".form")
    bg.classList.remove("visible")
    form.classList.remove("visible")
    formTitle.innerHTML = "Add new todo"
    choose.classList.remove("visible")
    categoryTxt.value = "";
    titleTxt.value = ""
    contentTxt.value = ""
    btnSave.style.display = "none"
    btnSubmit.style.display ="block"

}
// show edit form
const btnEdit = document.querySelector(".btn-edit"),
    btnDel = document.querySelector(".btn-delete"),
    form = document.querySelector(".form"),
    choose = document.querySelector(".choose-status"),
    formTitle = document.querySelector(".form-title h1"),
    todoTasks = document.querySelector(".tasks--todo"),
    doingTasks = document.querySelector(".tasks--doing"),
    finishedTasks = document.querySelector(".tasks--finished"),
    todoNumber = document.querySelector(".tasks:nth-child(1) .tasks-status span"),
    doingNumber = document.querySelector(".tasks:nth-child(2) .tasks-status span"),
    finishedNumber = document.querySelector(".tasks:nth-child(3) .tasks-status span");
// var categoryTxt = document.getElementById("category"),
//     titleTxt = document.getElementById("title"),
//     contentTxt = document.getElementById("content"),
//     status = document.querySelectorAll(".status")

// const data = [
//     {
//         id: 0,
//         category: 'bbb',
//         title: 'bbb',
//         content: 'bbb',
//         status: 'todo',
//         date: new Date()
//     },
//     {
//         id: 1,
//         category: 'ccc',
//         title: 'ccc',
//         content: 'ccc',
//         status: 'doing',
//         date: new Date()
//     },
//     {
//         id: 2,
//         category: 'aaa',
//         title: 'aaa',
//         content: 'aaa',
//         status: 'finished',
//         date: new Date()
//     }
// ]
// localStorage.setItem("tasks", JSON.stringify(data))
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
// !
function insertTaskHTML(task) {

    let taskHTML = ` <div class="task">
    <div class="task-top row">
        <div class="task-info">
            <div class="task-category">${task.category}</div>
            <div class="task-title">
            ${task.title}
            </div>
        </div>
        <div class="task-action row">
            <i class="fa-solid fa-pen btn-edit" onclick="showEditForm(${task.id})"></i>
            <i class="fa-solid fa-trash btn-delete"onclick="deleteTask(${task.id})" ></i>
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
    let tasksList = getAllTasks();
    tasksList.forEach(insertTaskHTML)
    todoNumber.innerText = getTodoTasks().length
    doingNumber.innerText = getDoingTasks().length
    finishedNumber.innerText = getFinishedTasks().length
}
showTasks()

// delete task 
function deleteTask(taskId) {
    var index;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == taskId) {
            index = i;
            break;
        }
    }
    if (index != -1) {
        tasks.splice(index, 1)
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }
    showTasks()
}
// add new task


const btnSubmit = document.querySelector("#btn-submit");
const btnSave = document.querySelector("#btn-edit")
btnSubmit.addEventListener("click", () => {
    var categoryTxt = document.getElementById("category").value.trim(),
    titleTxt = document.getElementById("title").value.trim(),
    contentTxt = document.getElementById("content").value.trim();
    if (categoryTxt.value = "" || titleTxt.value == "" || contentTxt.value == "") {
        alert()
    }
    else{
        let newTask = {
            id: tasks.length,
            category: categoryTxt,
            title: titleTxt,
            content: contentTxt,
            status: 'todo',
            date: new Date()
        }
        tasks.push(newTask)
        localStorage.setItem("tasks", JSON.stringify(tasks))
        showTasks()
    }  // add

    
})

function showEditForm(taskId) {
    showForm()
    formTitle.innerHTML = "Edit todo"
    choose.classList.add("visible")
    let editTask = tasks.find(item => item.id == taskId)
    document.getElementById("category").value = editTask.category
    document.getElementById("title").value = editTask.title
    document.getElementById("content").value = editTask.content
    var ele = document.querySelectorAll('.choose-status input');
    for (i = 0; i < ele.length; i++) {

        if (ele[i].type = "radio") {

            if (ele[i].value == editTask.status) {
                ele[i].checked = true
            }

        }
    }
    btnSubmit.style.display = "none"
    btnSave.style.display ="block"
    btnSave.addEventListener("click",() =>{
        let task = tasks.find(task => task.id == taskId)
                task.category = document.getElementById("category").value.trim();
                task.title = document.getElementById("title").value.trim();
                task.content = document.getElementById("content").value.trim();
                task.date = new Date();
                if (document.getElementById('todo').checked) {
        
                    task.status = document.getElementById('todo').value;
                }
                else if (document.getElementById('doing').checked) {
                    console.log(document.getElementById('doing').value)
                    task.status = document.getElementById('doing').value;
                }
                else if (document.getElementById('finished').checked) {
                    task.status = document.getElementById('finished').value;
                }
                
        
            
            localStorage.setItem("tasks", JSON.stringify(tasks))
            showTasks();
    })
}
// function addUpdate(taskId) {
//     console.log(taskId)
//     categoryTxt.value.trim();
//     titleTxt.value.trim();
//     contentTxt.value.trim();
//     if (categoryTxt.value = "" || titleTxt.value == "" || contentTxt.value == "") {
//         alert()
//     }
//     if (taskId == "") {
//         // add
//         let newTask = {
//             id: tasks.length,
//             category: categoryTxt,
//             title: titleTxt,
//             content: contentTxt,
//             status: 'todo',
//             date: new Date()
//         }
//         tasks.push(newTask)

//     }
//     else {
//         // update
//         // find task has the id
//         let task = tasks.find(task => task.id == taskId)
//         task.category = categoryTxt.value.trim();
//         task.title = titleTxt.value.trim();
//         task.content = contentTxt.value.trim();
//         task.date = new Date();
//         if (document.getElementById('todo').checked) {

//             task.status = document.getElementById('todo').value;
//         }
//         else if (document.getElementById('doing').checked) {
//             console.log(document.getElementById('doing').value)
//             task.status = document.getElementById('doing').value;
//         }
//         else if (document.getElementById('finished').checked) {
//             task.status = document.getElementById('finished').value;
//         }
        

//     }
//     localStorage.setItem("tasks", JSON.stringify(tasks))
//     showTasks();
// }
