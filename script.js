// 다들 화이팅!! ٩( *˙0˙*)۶

const todoInputElement = document.getElementById('todo-input');
const todoInputButton = document.getElementById('input-btn');
const todoListElement = document.getElementById('todo-list');
const doneListElement = document.getElementById('done-list');

// local storage에서 todo list 가져오기
function getTodoList() {
  const todoList = localStorage.getItem('todoList');
  return todoList ? JSON.parse(todoList) : [];
}

// local storage에 todo list 저장하기
function setTodoList(todoList) {
  localStorage.setItem('todoList', JSON.stringify(todoList));
}

window.onload = function () {
  // 창을 새로고침해도 todo list가 유지되도록 하기
  todoListElement.innerHTML = '';
  getTodoList().forEach((todo) => {
    createTodoElement(todo);
  });
};

// input 버튼 클릭 시
todoInputButton.addEventListener('click', () => {
  if (todoInputElement.value === '') {
    //입력값이 없을 때
    alert('한 글자 이상 입력해주세요!');
    return;
  }

  const newTodo = {
    createTime: Date.now(), //todo 객체를 구분하기 위한 고유값으로 생성한 시간 사용
    content: todoInputElement.value,
    isComplete: false,
  };

  const newTodoList = [...getTodoList(), newTodo];
  setTodoList(newTodoList); //local storage에 저장
  createTodoElement(newTodo); //새로운 todo element를 화면에 출력
  todoInputElement.value = ''; // input value 초기화
});

// todo element 생성
function createTodoElement(todo) {
  const newLi = document.createElement('li');
  const newDoneBtn = document.createElement('button');
  const newSpan = document.createElement('span');
  const newDeleteBtn = document.createElement('button');

  newLi.appendChild(newDoneBtn);
  newLi.appendChild(newSpan);
  newLi.appendChild(newDeleteBtn);

  newSpan.textContent = todo.content;

  //완료 버튼 클릭 시
  newDoneBtn.addEventListener('click', () => {updateIsComplete(todo, newLi)});
  //삭제 버튼 클릭 시
  newDeleteBtn.addEventListener('click', () => {deleteFromList(todo, newLi)});

  //완료 여부에 따라 todoList / doneList에 추가
  if (todo.isComplete) {
    newDoneBtn.innerText = 'v';
    doneListElement.appendChild(newLi);
  } else {
    newDoneBtn.innerHTML = '';
    todoListElement.appendChild(newLi);
  }

  newDeleteBtn.textContent = 'x';
  updateItemCount();
}

//완료 버튼 클릭 시 이벤트
function updateIsComplete(todo, liElement) {
    // filter로 기존 todoList에서 해당 todo 삭제 -> todo.isComplete 변경 -> 다시 추가
    let newTodoList = getTodoList().filter((item) => { 
      return item.createTime != todo.createTime;
    });
    todo.isComplete = !todo.isComplete;
    newTodoList = [...newTodoList, todo];

    setTodoList(newTodoList);
    liElement.remove(); //기존 li 삭제
    createTodoElement(todo); //새로운 li 생성
    updateItemCount();
}

//삭제 버튼 클릭 시 이벤트
function deleteFromList(todo, liElement) {
  const newTodoList = getTodoList().filter((item) => { 
    return item.createTime != todo.createTime;
  });

  setTodoList(newTodoList);
  liElement.remove();
  updateItemCount();
}

// todo, done 개수 업데이트
function updateItemCount() {
  const todoNum = document.getElementById('todo-num');
  const doneNum = document.getElementById('done-num');
  todoNum.textContent = `📋 Todo (${
    todoListElement.getElementsByTagName('li').length
  })`;
  doneNum.textContent = `👍🏻 Done (${
    doneListElement.getElementsByTagName('li').length
  })`;
}