const date = document.querySelector('#date');
const list = document.querySelector('#list');
const input = document.querySelector('#input');
const enterButton = document.querySelector('#enter');

// Add task function
function addTask(task) {
    const element = `<li id="element">
                    <i class="far fa-circle co" data="done" id="0"></i>
                    <p class="text">${task}</p>
                     <i class="fas fa-trash de" data="deleted" id="0"></i>
                    </li>`
    list.insertAdjacentHTML("beforeend", element)
}

enterButton.addEventListener('click', () => {
    const task = input.value
    if(task){
        addTask(task)
    }
    input.value = ''
})

document.addEventListener('keyup', function(event){
    if(event.key == 'Enter'){
        const task = input.value
        if(task){
            addTask(task)
        }
        input.value = ''
    }
})