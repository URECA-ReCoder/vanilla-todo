  const todoInput = document.querySelector(".input-container input");
  const addButton = document.querySelector(".input-container button");
  const todoList = document.querySelector(".todo-list");
  const todoCount = document.querySelector(".todo-list-container h2");

  let todoItems = [];//'추가' 버튼 클릭 시 호출되는 이벤트 리스너를 설정
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
