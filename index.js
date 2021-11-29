const addBtn = document.getElementById('add-btn');
const deskTaskInput = document.getElementById('user-task');
const todoWrapper = document.querySelector('.task-wrapper');

let tasks = !localStorage.tasks ? [] : JSON.parse(localStorage.getItem('tasks'));

let todoItems = [];

function Task(description) {
    this.description = description;
    this.completed = false;
    this.isEdit = false;
}

const fillHtmlList = () => {
    todoWrapper.innerHTML = "";

    if (tasks.length) {
        tasks.forEach((item, index) => {
            todoWrapper.innerHTML += createTemplate(item, index);
        });
        todoItems = document.querySelectorAll('.todo-item');
    }
}
fillHtmlList()

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

const completeTask = index => {
    tasks[index].completed = !tasks[index].completed;

    if (tasks[index].completed) {
        todoItems[index].classList.add('checked');
    } else {
        todoItems[index].classList.remove('checked')
    }

    updateLocal();
    fillHtmlList();
}

addBtn.addEventListener('click', () => {
    if (deskTaskInput.value) {
        const editableTask = tasks.reduce((acc, curr, index) => {
            if (curr.isEdit === true) {
                curr.description = deskTaskInput.value;
                curr.isEdit = false

                acc.task = curr;
                acc.index = index;
            }

            return acc;
        }, {task: {}, index: null});

        if (editableTask.index === null) {
            tasks.push(new Task(deskTaskInput.value));
        } else {
            tasks.splice(editableTask.index, 1, editableTask.task)
        }

        deskTaskInput.value = '';
        fillHtmlList()
        updateLocal();
    }
})

const deleteTask = index => {
    console.log('1111111111111111111111111111111111111')

    todoItems[index].classList.add('deletion');

    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
}

const editTask = index => {
    console.log('1111111111111111111111111111111111111')
    deskTaskInput.value = todoItems[index].innerHTML;
    tasks[index].isEdit = !tasks[index].isEdit;
}

function createTemplate(task, index) {
    return `
        <div class="description">
            <div class="todo-item ${task.completed ? 'checked' : ''}" onclick="completeTask(${index})">${task.description}</div>
            <div class="buttons">
                <button onclick="editTask(${index})" class="btn-edit">&#9998;</button>
                <button onclick="deleteTask(${index})" class="btn-delete">&#x2716;</button>
            </div>
        </div>
    `
}
