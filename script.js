const date = document.querySelector('#date')
const list = document.querySelector('#list')
const input = document.querySelector('#input')
const enterButton = document.querySelector('#enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id = 0

// Add task function
function addTask(task, id, done, deleted) {
    if(deleted){
        return
    }
    const doneTask = done ? check : uncheck 
    const line = done ? lineThrough : ''
    const element = `<li id="element">
                    <i class="far ${doneTask}" data="done" id="${id}"></i>
                    <p class="text" ${line}>${task}</p>
                     <i class="fas fa-trash de" data="deleted" id="${id}"></i>
                    </li>`
    list.insertAdjacentHTML("beforeend", element)
}

// Done task function
function TaskDone(element){
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
}

// Deleted task function
function TaskDeleted(element){
    element.parentNode.parentNode.removeChild(element.parentNode)
}

enterButton.addEventListener('click', () => {
    const task = input.value
    if(task){
        addTask(task, id, false, false)
    }
    input.value = ''
    id++
})

document.addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        const task = input.value
        if(task){
            addTask(task, id, false, false)
        }
        input.value = ''
        id++
    }
})

list.addEventListener('click', function(event){
    const element = event.target
    const elementData = element.attributes.data.value
   
    if(elementData === 'done'){
        TaskDone(element)
    }
    else if (elementData === 'deleted'){
        TaskDeleted(element)
    }
})