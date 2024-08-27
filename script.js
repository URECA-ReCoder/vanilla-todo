let todoInput = document.getElementById('todo-input'); // 할 일 입력창
let todoList = document.getElementById('todo-list'); // 할 일 리스트창
let addTodoBtn = document.getElementById('add-todo-btn'); // 버튼
let doneTodoList = document.getElementById('done-todo-list'); // 완료된 할 일 리스트창

function addTodo(event) {
  event.preventDefault();

  let $li = document.createElement('li');
  if (!todoInput.value) {
    alert('공백은 입력할 수 없습니다.');
  } else {
    console.log('todolist');
    $li.innerText = todoInput.value;
    todoList.appendChild($li);
    todoInput.value = '';
    todoInput.focus();
  }
}

addTodoBtn.addEventListener('click', addTodo);
