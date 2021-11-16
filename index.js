const addBtn = document.getElementById('add-btn');
const deskTaskInput = document.getElementById('user-task');
const todoWrapper = document.querySelector('.task-wrapper');


let tasks = !localStorage.tasks ? [] : JSON.parse(localStorage.getItem('tasks'));

let todoItem = [];

function Task(description) {
    this.description = description;
    this.completed = false;
}

const createTemplate = (task, index) => {
    return `
        <div class="todo-item ${task.completed ? 'checked' : ''}">
            <div class="description">${task.description}</div>
            <div class="buttons">
                <input onclick="completeTask(${index})" class="btn-complete" type="checkbox" ${task.completed ? 'checked' : ''} >
                <button onclick="deleteTask(${index})" class="btn-delete">Delete</button>
            </div>
        </div>
    `
}

const fillHtmlList = () => {
    todoWrapper.innerHTML = "";
    if (tasks.length) {
        tasks.forEach((item, index) => {
            todoWrapper.innerHTML += createTemplate(item, index);
        });
        todoItem = document.querySelectorAll('.todo-item');
    }
}
fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;
    if (tasks[index].completed){
        todoItem[index].classList.add('checked');
    }else {
        todoItem[index].classList.remove('checked')
    }
    updateLocal();
    fillHtmlList();
}

addBtn.addEventListener('click', () => {
    tasks.push(new Task(deskTaskInput.value));
    updateLocal();
    fillHtmlList();
    deskTaskInput.value = '';
})

const deleteTask = index => {

    todoItem[index].classList.add('deletion');
   setTimeout(() => {
       tasks.splice(index,1);
       updateLocal();
       fillHtmlList();
   }, 400)
}