// 다들 화이팅!! ٩( *˙0˙*)۶

window.onload = function () {
  // 창을 새로고침해도 todo list가 유지되도록 하기
  todoListElement.innerHTML = "";
  getTodoList().forEach((todo) => {
    createTodoElement(todo);
  });
};

const todoInputElement = document.getElementById("todo-input");
const todoInputButton = document.getElementById("input-btn");
const todoListElement = document.getElementById("todo-list");
const doneListElement = document.getElementById("done-list");

todoInputButton.addEventListener("click", () => {
  if (todoInputElement.value === "") {
    alert("한 글자 이상 입력해주세요!");
    return;
  }
  const newTodo = {
    content: todoInputElement.value,
    complete: false,
  };
  setTodoList(newTodo); //새로운 input value를 추가한 배열을 local storage의 todoList에 저장
  createTodoElement(newTodo); //새로운 input value를 화면에 출력
  todoInputElement.value = ""; // input value 초기화
});

function getTodoList() {
  // local storage에 저장된 값을 배열로 불러오기
  const todoList = localStorage.getItem("todoList");
  return todoList ? JSON.parse(todoList) : [];
}

function setTodoList(todo) {
  let newTodoList = getTodoList();
  for (let i = 0; i < newTodoList.length; i++) {
    //todo done 여부 확인
    if (
      newTodoList[i].content === todo.content &&
      newTodoList[i].complete !== todo.complete
    ) {
      newTodoList.splice(i, 1);
      break;
    }
  }
  newTodoList.push(todo);
  localStorage.setItem("todoList", JSON.stringify(newTodoList));
}

function createTodoElement(todo) {
  //todo = {content: '내용', complete: false}
  const newLi = document.createElement("li");
  const newDoneBtn = document.createElement("button");
  const newSpan = document.createElement("span");
  const newDeleteBtn = document.createElement("button");

  newLi.appendChild(newDoneBtn);
  newLi.appendChild(newSpan);
  newLi.appendChild(newDeleteBtn);

  newSpan.textContent = todo.content;

  newDoneBtn.addEventListener("click", () => {
    todo.complete = !todo.complete;
    setTodoList(todo);
    createTodoElement(todo);
    newLi.remove();
    updateItemCount();
  });

  newDeleteBtn.addEventListener("click", () => {
    const newTodoList = getTodoList();
    const index = newTodoList.indexOf(todo);
    newTodoList.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
    newLi.remove();
    updateItemCount();
  });

  if (todo.complete) {
    //완료된 todo인 경우
    newDoneBtn.innerText = "v";
    doneListElement.appendChild(newLi);
  } else {
    newDoneBtn.innerHTML = "&nbsp;";
    todoListElement.appendChild(newLi);
  }

  newDeleteBtn.textContent = "x";
  updateItemCount();
}

function updateItemCount() {
    const todoNum = document.getElementById('todo-num');
    const doneNum = document.getElementById('done-num');
    todoNum.textContent = `📋 Todo (${todoListElement.getElementsByTagName('li').length})`;
    doneNum.textContent = `👍🏻 Done (${doneListElement.getElementsByTagName('li').length})`;
    console.log(todoNum, doneNum);
}