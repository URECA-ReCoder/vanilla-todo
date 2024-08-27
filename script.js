const todoInput = document.querySelector(".input-container input");
const addButton = document.querySelector(".input-container button");
const todoList = document.querySelector(".todo-list");
const todoCount = document.querySelector(".todo-list-container h2");

let todoItems = [];

// '추가' 버튼 클릭 시 호출되는 이벤트 리스너를 설정
addButton.addEventListener("click", () => {
    const task = todoInput.value.trim();
    if (task) {
        addTodoItem(task);
        todoInput.value = "";
    }
});

// 새로운 할 일 항목을 배열에 추가
function addTodoItem(task) {
    todoItems.push(task);
    renderTodoList();
}

// 지정된 인덱스의 항목을 배열에서 제거
function removeTodoItem(index) {
    // 인덱스에 해당하는 항목을 배열에서 제거
    todoItems.splice(index, 1);
    // 업데이트된 리스트를 다시 렌더링
    renderTodoList();
}

function renderTodoList() {
    // 기존 리스트를 초기화
    todoList.innerHTML = "";
    todoItems.forEach((item, index) => {
        const li = document.createElement("li");
        li.textContent = item;

        // 삭제 버튼 생성
        const deleteBtn = document.createElement("span");
        deleteBtn.textContent = "🗑️";
        deleteBtn.classList.add("delete-btn");
        // 클릭 시 항목 삭제
        deleteBtn.addEventListener("click", () => removeTodoItem(index));

        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });
    // 리스트의 항목 수를 업데이트
    todoCount.textContent = `🗒️ TO DO (${todoItems.length})`;
}
