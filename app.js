//selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');


//event listeners
todoButton.addEventListener('click', addTodo);
//event listener for whole todolist, if clicked on .class=trash-btn then removes element
todoList.addEventListener('click',deleteCheck);
filterOption.addEventListener('click',filterTodo);


savedTodos = JSON.parse(localStorage.getItem('todos'));
if (savedTodos.length > 0){
  console.log(savedTodos.length);
  console.log('trying to create');
  for(x=0;x<savedTodos.length;x++){

    recreateTodos(savedTodos[x]);
    console.log('created value at' + savedTodos[x]);
    }
}





//functions
function recreateTodos(value){
  
  let todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");
  
  //create li
  const newTodo = document.createElement('li');
  
  newTodo.innerText = value;
  //clear input value
  newTodo.classList.add('todo-item');
  todoDiv.append(newTodo);

  //create check todoButton
  const completedButton = document.createElement('button');
  completedButton.innerHTML = '<i class="fas fa-check"></i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);
  
  //create trash button
  const trashButton = document.createElement('button');
  trashButton.innerHTML = '<i class="fas fa-trash"></i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);
  
  
  //append to list
  todoList.appendChild(todoDiv);
}

function deleteCheck(event){
  const item = event.target;
  //trash item
  if(item.classList[0] === 'trash-btn'){
    const todo =item.parentElement;
    //wait for animation b4 removing
    const val = todo.innerText;
    todo.classList.add('fall');
    todo.addEventListener('transitionend', function(){
      
      removeTodo(val);
      todo.remove();
    });

  }

  //check mark
  if(item.classList[0] === 'complete-btn'){
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}



function addTodo(event){
  //prevent from submitting
  event.preventDefault();
const todoDiv = document.createElement("div");
todoDiv.classList.add("todo");

//create li
const newTodo = document.createElement('li');

newTodo.innerText = todoInput.value;
todos = JSON.parse(localStorage.getItem('todos'));
//check if text entry is empty or duplicate (fixes deletion bug)
if(todoInput.value.length > 0 && !todos.includes(todoInput.value)){

saveLocalTodos(todoInput.value);
//clear input value
newTodo.classList.add('todo-item');
todoDiv.append(newTodo);
//reset input box
todoInput.value='';


//create check todoButton
const completedButton = document.createElement('button');
completedButton.innerHTML = '<i class="fas fa-check"></i>';
completedButton.classList.add("complete-btn");
todoDiv.appendChild(completedButton);


//create trash button
const trashButton = document.createElement('button');
trashButton.innerHTML = '<i class="fas fa-trash"></i>';
trashButton.classList.add("trash-btn");
todoDiv.appendChild(trashButton);


//append <div> to list
todoList.appendChild(todoDiv);
} else { 
  console.log('FAIL');
}
}

//filter todo
function filterTodo(e){
  const todos = todoList.childNodes;
  todos.forEach(function(todo){
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")){
          todo.style.display = 'flex';
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")){
          todo.style.display = 'flex';
        } else {
          todo.style.display = 'none';
        }
        break;
     }
  })
}
function removeTodo(val){
  todos = JSON.parse(localStorage.getItem('todos'));
  for(x=0;x<todos.length;x++){
  if(val === todos[x]){
    console.log(val);
    todos.splice(x, 1);
    localStorage.setItem('todos',JSON.stringify(todos));
  }
}
  console.log('tried to remove');
  console.log(val);
}

function saveLocalTodos(todo){
  let todos;
  if(localStorage.getItem('todos') === null){
    todos = [];
  } else{
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos',JSON.stringify(todos));
  
}