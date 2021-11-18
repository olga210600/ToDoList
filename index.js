const addBtn = document.getElementById('add-btn');
const deskTaskInput = document.getElementById('user-task');
const todoWrapper = document.querySelector('.task-wrapper');

fetch('https://jsonplaceholder.typicode.com/users')
    .then(response => response.json())
    .then(json => console.table(json))
    .catch(error => console.error(error))

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

function getData() {

    fetch("https://jsonplaceholder.typicode.com/todos?_limit=15")
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log("You so bad!" + response.status);
                    return;
                }

                response.json().then(function (data) {
                    //console.log(data);
                    getDataToArray(data);
                });
            }
        )
        .catch(function (err) {
            console.log("fetch Error : -S", err);
        });
}

function getDataToArray(data) {
    for (let i = 0; i < 15; i++) {
        array[i] = data[i];
    }
    console.log(array);


}

const getPaint = () => {
    for (let i = 0; i < array.length; i++) {
        document.getElementById('show-task').innerHTML += array[i].title + '<p>';
    }
}
const addition = document.getElementById('btn-addition-second');

// addition.addEventListener('click', () => {
//
//     getPaint()
// })


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
//
// const input = document.getElementById('input-text');
// const button = document.getElementById('btn-push');
// const section = document.querySelector('.section');
// const plans_out = document.querySelector('.plans-out');
// const list = document.querySelector('.list');
// const delete_button = document.qetElementsByClassName('btn-delete-li');
// const button_delete = document.qetElementsByClassName('delete-btn');
// const JSON_PLACEHOLDER_TO_DO = 'https://jsonplaceholder.typicode.com/todos?_limit=15';
// const JSON_PLACEHOLDER_DELETE_TO_DO = 'https://jsonplaceholder.typicode.com/todos/';
// consttodosarray = [];
//
// function addPlans( ){
//     if(!input.value)return;
//     do {
//         let div = document.createElement('div');
//         let newInputValue = document.createElement('li');
//         let newInputCheck = document.createElement('input');
//         let buttonDelete = document.createElement('button');
//         div.className = input.value + ' ' + 'container-li';
//         newInputCheck.type = 'checkbox';
//         newInputValue.textContent = input.value;
//         buttonDelete.id = input.value + ' ' + 'btn-delete-li';
//         buttonDelete.className = 'btn-delete-li'
//         buttonDelete.textContent = 'Delete'
//         list.prepend(div)
//         div.prepend(newInputValue, newInputCheck, buttonDelete)
//         localStorage.setItem(`plans-${input.value}`, input.value)
//         input.value = ''
//     }while (input.value);
// }
// for(const item of delete_button){
//     item.addEventListener('click', deleteInputPlans);
// }
//
// function deleteInputPlans(){
//     this.parentElement.remove();
//     console.log()
// }
//
// window.addEventListener('load', () =>{
//     getPlans(JSON_PLACEHOLDER_TO_DO);
//     localStorage.clear()
// });
//
// button.addEventListener('click', addPlans);
//

