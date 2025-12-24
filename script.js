let taskData = {}


const todo = document.querySelector('#todo')
const progress = document.querySelector('#progress')
const done = document.querySelector('#done')
const columns = [todo, progress, done]
let dragElement = null;

if(localStorage.getItem("tasks")){

    const data = JSON.parse(localStorage.getItem("tasks"))

    console.log(data);
    
    for (const col in data) {
        
        const div = document.querySelector(`#${col}`)
        data[col].forEach(task =>{
            const div = document.createElement("div")

            div.classList.add("task")
            div.setAttribute("draggable", "true")

            div.innerHTML = `
                <h2>${task.title}</h2>
                <p>${task.desc}</p>
                <button>Delete</button>
            `
            column.appendChild(div)

            div.addEventListener("drag", (e)=>{
                dragElement = div
            })
        })
        
    }
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

// progress.addEventListener("dragenter", (e)=>{
//     progress.classList.add("hover-over")
// })
// done.addEventListener("dragenter", (e)=>{
//     done.classList.add("hover-over")
// })
// todo.addEventListener("dragenter", (e)=>{
//     todo.classList.add("hover-over")
// })

// // Drag leave
// progress.addEventListener("dragleave", (e)=>{
//     progress.classList.remove("hover-over")
// })
// done.addEventListener("dragleave", (e)=>{
//     done.classList.remove("hover-over")
// })
// todo.addEventListener("dragleave", (e)=>{
//     todo.classList.remove("hover-over")
// })

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
        console.log("Dropped", dragElement, column);

        column.appendChild(dragElement)
        column.classList.remove("hover-over")
        
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

    // const template = `<div draggable="true" class="task">  
    //                 <h2>${taskTitle}</h2>
    //                 <p>${taskDesc}</p>
    //                 <button>Delete</button>
    //             </div>`

    const div = document.createElement("div")

    div.classList.add("task")
    div.setAttribute("draggable", "true")

    div.innerHTML = `
        <h2>${taskTitle}</h2>
        <p>${taskDesc}</p>
        <button id='del-task'>Delete</button>
    `

    todo.appendChild(div)

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

    div.addEventListener("drag", (e)=>{
        dragElement = div
    })

    modal.classList.remove("active")
})


/* Task Delete Logic */
const delTaskBtn = document.querySelector('#del-task')
const taskCol = document.querySelectorAll('.task-column')

delTaskBtn.addEventListener("click", ()=>{
    taskCol.classList.remove(".task")
})