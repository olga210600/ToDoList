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
        }, { task: {}, index: null });

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
    todoItems[index].classList.add('deletion');

    tasks.splice(index, 1);
    updateLocal();
    fillHtmlList();
}

const editTask = index => {
    deskTaskInput.value = todoItems[index].innerHTML;
    tasks[index].isEdit = !tasks[index].isEdit;
}

let array = [];

// function getData() {
//
//     fetch("https://jsonplaceholder.typicode.com/todos?_limit=15")
//         .then(
//             function (response) {
//                 if (response.status !== 200) {
//                     console.log("You so bad!" + response.status);
//                     return;
//                 }
//
//                 response.json().then(function (data) {
//                     //console.log(data);
//                     getDataToArray(data);
//                 });
//             }
//         )
//         .catch(function (err) {
//             console.log("fetch Error : -S", err);
//         });
// }
//
// function getDataToArray(data) {
//     for (let i = 0; i < 15; i++) {
//         array[i] = data[i];
//     }
//     console.log(array);
//
//
// }

const getPaint = () => {
    for (let i = 0; i < array.length; i++) {
        document.getElementById('show-task').innerHTML += array[i].title + '<p>';
    }
}
const addition = document.getElementById('btn-addition-second');



console.log(getData())

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

// function getFromLocalStorage() {
//     const reference = localStorage.getItem('todoItems');
//     // if reference exists
//     if (reference) {
//         // converts back to array and store it in todos array
//         todoItems = JSON.parse(reference);
//         fillHtmlList(todoItems);
//     }
// }
//
// // initially get everything from localStorage
// getFromLocalStorage();
// console.log(getFromLocalStorage())

