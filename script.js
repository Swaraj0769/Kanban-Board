let taskData = {}


const todo = document.querySelector('#todo')
const progress = document.querySelector('#progress')
const done = document.querySelector('#done')
const columns = [todo, progress, done]
let dragElement = null;

function addTask(title, desc, column){
    const div = document.createElement("div")

    div.classList.add("task")
    div.setAttribute("draggable", "true")

    div.innerHTML = `
        <h2>${title}</h2>
        <p>${desc}</p>
        <button>Delete</button>
    `
    column.appendChild(div)

    div.addEventListener("drag", (e)=>{
        dragElement = div;
    })

    return div;
}

function updateTaskCount(){
    columns.forEach(col =>{
            const tasks = col.querySelectorAll(".task")
            const count = col.querySelector('.right')

            taskData[ col.id ] = Array.from(tasks).map(t =>{
                return {
                    title: t.querySelector("h2").innerText,
                    desc: t.querySelector('p').innerText
                }
            })

            localStorage.setItem("tasks", JSON.stringify(taskData));            
            count.innerText = tasks.length;
    })
}

if(localStorage.getItem("tasks")){

    const data = JSON.parse(localStorage.getItem("tasks"))

    // console.log(data);
    
    for (const col in data) {
        
        const column = document.querySelector(`#${col}`)
        data[col].forEach(task =>{
            addTask(task.title, task.desc, column)
        })
        
     }

    updateTaskCount();

}

// console.log(todo, progress, done);   

const task = document.querySelectorAll('.task')

task.forEach(task => {
    task.addEventListener("drag", (e)=>{
        // console.log("dragging ", e);
        dragElement = task;
    })
})

// // Drag enter 

function addDragEventOnColumn(column){
    column.addEventListener("dragenter", (e)=>{
        e.preventDefault();
        column.classList.add("hover-over");
    })
    column.addEventListener("dragleave", (e)=>{
        e.preventDefault();
        column.classList.remove("hover-over");
    })

    column.addEventListener("dragover", (e)=>{
        e.preventDefault();
    })

    column.addEventListener('drop', (e)=>{
        e.preventDefault();
        // console.log("Dropped", dragElement, column);

        column.appendChild(dragElement)
        column.classList.remove("hover-over")
        
        updateTaskCount();        
    })
}

addDragEventOnColumn(todo)
addDragEventOnColumn(done)
addDragEventOnColumn(progress)


/* Modal related logic */
const toggleModelButton = document.querySelector('#toggle-modal')
const modalBg = document.querySelector('.modal .bg')
const modal = document.querySelector(".modal")
const addTaskButton = document.querySelector("#add-new-task")

toggleModelButton.addEventListener("click", () =>{
    modal.classList.toggle("active")
})

modalBg.addEventListener("click", ()=>{
    modal.classList.remove("active")
})

addTaskButton.addEventListener("click", ()=>{
    const taskTitle = document.querySelector('#task-title-input').value
    const taskDesc = document.querySelector('#task-desc-input').value

    addTask(taskTitle, taskDesc, todo)
    updateTaskCount();
    modal.classList.remove("active")
})


/* Task Delete Logic */
const delTaskBtn = document.querySelector('#del-task')
const taskCol = document.querySelectorAll('.task-column')

delTaskBtn.addEventListener("click", ()=>{
    taskCol.classList.remove(".task")
})