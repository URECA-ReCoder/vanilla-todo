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

// input 버튼 클릭 시
todoInputButton.addEventListener("click", () => {
  if (todoInputElement.value === "") {
    //입력값이 없을 때
    alert("한 글자 이상 입력해주세요!");
    return;
  }

  const newTodo = {
    content: todoInputElement.value,
    complete: false,
  };

  setTodoList(newTodo); //local storage에 저장
  createTodoElement(newTodo); //새로운 todo element를 화면에 출력
  todoInputElement.value = ""; // input value 초기화
});

// local storage에 저장된 값을 배열로 불러오기
function getTodoList() {
  const todoList = localStorage.getItem("todoList");
  return todoList ? JSON.parse(todoList) : [];
}

// local storage에 todo list 저장하기
function setTodoList(todo) {
  let newTodoList = getTodoList();
  //todo done 여부 확인
  for (let i = 0; i < newTodoList.length; i++) {
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

// todo element 생성
function createTodoElement(todo) {
  const newLi = document.createElement("li");
  const newDoneBtn = document.createElement("button");
  const newSpan = document.createElement("span");
  const newDeleteBtn = document.createElement("button");

  newLi.appendChild(newDoneBtn);
  newLi.appendChild(newSpan);
  newLi.appendChild(newDeleteBtn);

  newSpan.textContent = todo.content;

  //완료 버튼 클릭 시
  newDoneBtn.addEventListener("click", () => {
    todo.complete = !todo.complete;
    setTodoList(todo);
    createTodoElement(todo);
    newLi.remove();
    updateItemCount();
  });

  //삭제 버튼 클릭 시
  newDeleteBtn.addEventListener("click", () => {
    const newTodoList = getTodoList();
    const index = newTodoList.indexOf(todo);
    newTodoList.splice(index, 1);
    localStorage.setItem("todoList", JSON.stringify(newTodoList));
    newLi.remove();
    updateItemCount();
  });

  //완료 여부에 따라 todoList / doneList에 추가
  if (todo.complete) {
    newDoneBtn.innerText = "v";
    doneListElement.appendChild(newLi);
  } else {
    newDoneBtn.innerHTML = "&nbsp;";
    todoListElement.appendChild(newLi);
  }

  newDeleteBtn.textContent = "x";
  updateItemCount();
}

// todo, done 개수 업데이트
function updateItemCount() {
  const todoNum = document.getElementById("todo-num");
  const doneNum = document.getElementById("done-num");
  todoNum.textContent = `📋 Todo (${
    todoListElement.getElementsByTagName("li").length
  })`;
  doneNum.textContent = `👍🏻 Done (${
    doneListElement.getElementsByTagName("li").length
  })`;
}
