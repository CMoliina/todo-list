const date = document.querySelector('#date')
const list = document.querySelector('#list')
const input = document.querySelector('#input')
const enterButton = document.querySelector('#enter')
const check = 'fa-check-circle'
const uncheck = 'fa-circle'
const lineThrough = 'line-through'
let id
let LIST


// Create date }
const ActualDate = new Date()
date.innerHTML = ActualDate.toLocaleDateString('es-CL', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })

// Add task function
function addTask(task, id, done, deleted) {
    if (deleted) {
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
function TaskDone(element) {
    element.classList.toggle(check)
    element.classList.toggle(uncheck)
    element.parentNode.querySelector('.text').classList.toggle(lineThrough)
    LIST[element.id].done = LIST[element.id].done ? false : true
}

// Deleted task function
function TaskDeleted(element) {
    element.parentNode.parentNode.removeChild(element.parentNode)
    LIST[element.id].deleted = true
}

// Listeners

enterButton.addEventListener('click', () => {
    const task = input.value
    if (task) {
        addTask(task, id, false, false)
        LIST.push({
            name: task,
            id: id,
            done: false,
            deleted: false
        })
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
    input.value = ''
    id++
})

document.addEventListener('keyup', function (event) {
    if (event.key == 'Enter') {
        const task = input.value
        if (task) {
            addTask(task, id, false, false)
            LIST.push({
                name: task,
                id: id,
                done: false,
                deleted: false
            })
        }
        localStorage.setItem('TODO', JSON.stringify(LIST))
        input.value = ''
        id++
    }
})

list.addEventListener('click', function (event) {
    const element = event.target
    const elementData = element.attributes.data.value

    if (elementData === 'done') {
        TaskDone(element)
    }
    else if (elementData === 'deleted') {
        TaskDeleted(element)
    }
    localStorage.setItem('TODO', JSON.stringify(LIST))
})

// LocalStorage get item
let data = localStorage.getItem('TODO')
if(data){
    LIST = JSON.parse(data)
    id = LIST.length
    loadList(LIST)
}else {
    LIST = []
    id = 0
}

function loadList(NewData) {
    NewData.forEach(function(i) {
        addTask(i.name, i.id, i.done, i.deleted)
    })
}