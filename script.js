const todo = document.querySelector('#todo')
const progress = document.querySelector('#progress')
const done = document.querySelector('#done')

// console.log(todo, progress, done);   

const task = document.querySelectorAll('.task')

task.forEach(task => {
    task.addEventListener("drag", (e)=>{
        // console.log("dragging ", e);
        
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
}

addDragEventOnColumn(todo)
addDragEventOnColumn(done)
addDragEventOnColumn(progress)