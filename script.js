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

// Drag enter 

progress.addEventListener("dragenter", (e)=>{
    progress.classList.add("hover-over")
})
done.addEventListener("dragenter", (e)=>{
    done.classList.add("hover-over")
})
todo.addEventListener("dragenter", (e)=>{
    todo.classList.add("hover-over")
})

