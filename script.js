// 다들 화이팅!! ٩( *˙0˙*)۶

window.onload = function () { // 창을 새로고침해도 todo list가 유지되도록 하기
    loadToDoList();
  };

function addNewTodoEvent() { // input 버튼을 클릭했을 때 local storage에 저장
    const todoInputElement = document.getElementById('todo-input');
    //새로운 input value를 추가한 배열을 local storage의 todoList에 저장
    const newTodo = todoInputElement.value;
    console.log(newTodo);
    let newTodoList = getTodoList();
    newTodoList.push(newTodo);
    localStorage.setItem('todoList', JSON.stringify(newTodoList));
    loadToDoList();
}

function loadToDoList() { // 불러온 list를 화면에 출력
    let todoListElement = document.getElementById('todo-list');
    todoListElement.innerHTML = ''; // 기존에 있던 리스트를 초기화

    getTodoList().forEach((todo) => { //list를 순회하며 li element 생성
        let todoElement = document.createElement('li');
        todoElement.innerText = todo;
        todoListElement.appendChild(todoElement);
    });
}

function getTodoList() { // local storage에 저장된 값을 배열로 불러오기
    const todoList = localStorage.getItem("todoList");
    console.log(todoList);
    return todoList ? JSON.parse(todoList) : [];
}
