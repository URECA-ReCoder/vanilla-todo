const todoInput = document.querySelector(".input-container input");
const addButton = document.querySelector(".input-container button");
const todoList = document.querySelector(".todo-list");
const doneList = document.querySelector(".done-list");
const todoCount = document.querySelector(".todo-list-container h2");
const doneCount = document.querySelector(".done-list-container h2");

let todoItems = []; 
let doneItems = []; 

//  버튼 클릭 시 호출되는 이벤트 리스너를 설정
addButton.addEventListener("click", () => {
  const task = todoInput.value.trim();
  if (task) {
    addTodoItem(task);
    todoInput.value = ""; // 입력 필드 초기화
  }
});

// 새로운 할 일 항목을 배열에 추가
function addTodoItem(task) {
  todoItems.push(task);
  renderTodoList(); // 할 일 목록을 렌더링
}

// 지정된 인덱스의 항목을 배열에서 제거
function removeTodoItem(index) {
  todoItems.splice(index, 1); // 인덱스에 해당하는 항목을 제거
  renderTodoList(); // 업데이트된 할 일 목록을 렌더링
}

// 항목을 완료 목록으로 이동
function completeTodoItem(index) {
  const completedTask = todoItems.splice(index, 1); // 완료된 항목을 todoItems에서 제거
  doneItems.push(completedTask[0]); // 완료된 항목을 doneItems에 추가
  renderTodoList(); // 할 일 목록을 렌더링
  renderDoneList(); // 완료된 항목 목록을 렌더링
}

// 할 일 목록을 화면에 렌더링
function renderTodoList() {
  todoList.innerHTML = ""; // 기존 목록 초기화
  todoItems.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = item;

    // 삭제 버튼 생성
    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "🗑️";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => removeTodoItem(index));

    // 완료 버튼 생성
    const completeBtn = document.createElement("span");
    completeBtn.textContent = "✔️";
    completeBtn.classList.add("complete-btn");
    completeBtn.addEventListener("click", () => completeTodoItem(index));

    li.appendChild(completeBtn);
    li.appendChild(deleteBtn);
    todoList.appendChild(li);
  });
  // 할 일 항목 수를 업데이트
  todoCount.textContent = `🗒️ TO DO (${todoItems.length})`;
}

// 완료된 항목 목록을 화면에 렌더링
function renderDoneList() {
  doneList.innerHTML = ""; // 기존 목록 초기화
  doneItems.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    doneList.appendChild(li);
  });
  // 완료된 항목 수를 업데이트
  doneCount.textContent = `💿 DONE (${doneItems.length})`;
}
