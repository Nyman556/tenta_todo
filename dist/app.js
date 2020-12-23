const checkmrk = '<div class="checkmark"></div>';
const checkmarkIcon = '<i class="fas fa-check"></i>';
const remove = '<i class="far fa-trash-alt"></i>';
const add = '<i class="fas fa-plus-circle"></i>';

let todos = fetchTodos();

function fetchTodos() {
    var xmlhttp = new XMLHttpRequest();
    var url = "./assets/todos.json";
  
    xmlhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var todos = JSON.parse(this.responseText);
        const createTodo = new CreateTodo('.todo-app',todos);
      }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}



class CreateTodo {
    constructor(selector, todos){
        this.todo = document.querySelector(selector);
        this.inputForm = document.querySelector('#input');
        this.todos = todos;

        this.CreateTodoList();
        this.list = document.querySelector('.todo-list');
        this.input = document.querySelector('input');
        this.renderTodos();
        this.setupInputEventListener();
        this.setupListEventListener();
    }


    CreateTodoList() {
        const input = document.createElement('input');
        input.classList.add('input');
        input.placeholder = 'Enter Todo';
        const btn = document.createElement('button');

        btn.innerHTML = add;

        this.inputForm.appendChild(input);
        this.inputForm.appendChild(btn);

        const list = document.createElement('div');
        list.classList.add('todo-list');
        this.todo.appendChild(list);
    }
    renderTodos() {
        this.todos.forEach(element => {
            const newTodo = document.createElement('div');
            newTodo.classList.add('todo');
            const todoInfo = document.createElement('span');
            todoInfo.classList.add('todo-info');
            todoInfo.innerHTML = `${checkmrk}${element.task}`;
            newTodo.appendChild(todoInfo);
            newTodo.innerHTML += `${remove}`;
            this.list.appendChild(newTodo);
        });
    }
    setupInputEventListener() {
        this.inputForm.addEventListener('submit', (e) => {
            e.preventDefault();
            if (this.input.value != '') {
            this.addTodo(this.input.value);
            this.input.value = '';
            }
        });
    }
    setupListEventListener() {
        this.list.addEventListener('click' , e => {
            if(e.target.classList.contains('checkmark')){
                if(!e.target.parentElement.classList.contains('done')) {
                    e.target.parentElement.classList.toggle('done');
                    e.target.innerHTML = checkmarkIcon;

                } else if (e.target.parentElement.classList.contains('done')){
                    e.target.parentElement.classList.toggle('done');
                    e.target.innerHTML = '';
                }
            }
            if(e.target.classList.contains('fa-check')){
                    e.target.parentElement.parentElement.classList.toggle('done');
                    e.target.parentElement.innerHTML = '';
            }
            if(e.target.classList.contains('fa-trash-alt')){
                this.list.removeChild(e.target.parentElement)
    
            }
        })
    }
    addTodo(todo) {
        const newTodo = document.createElement('div');
            newTodo.classList.add('todo');
            const todoInfo = document.createElement('span');
            todoInfo.classList.add('todo-info');
            todoInfo.innerHTML = `${checkmrk}${todo}`;
            newTodo.appendChild(todoInfo);
            newTodo.innerHTML += `${remove}`;
            this.list.appendChild(newTodo);
    }
}