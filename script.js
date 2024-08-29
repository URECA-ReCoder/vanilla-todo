const todoInput = document.getElementById('todo-input'); // 할 일 입력창
const todoList = document.getElementById('todo-list'); // 할 일 리스트창
const addTodoBtn = document.getElementById('add-todo-btn'); // 버튼
const doneTodoList = document.getElementById('done-todo-list'); // 완료된 할 일 리스트창
const todoListTitle = document.getElementById('todo-list-title'); // 할 일 제목
const doneTodoListTitle = document.getElementById('done-todo-list-title'); // 완료된 할 일 제목

// input으로 입력 받은 할 일을 리스트창에 추가
function addTodo(event) {
  event.preventDefault(); // form 태그의 기본 새로고침 기능 지우기

  let $li = document.createElement('li');
  let $btn = document.createElement('button');

  const todoText = todoInput.value.trim();

  //공백 방지
  if (!todoText) {
    alert('공백은 입력할 수 없습니다.');
  }

  $li.innerText = todoText;
  todoList.appendChild($li);
  todoInput.value = ''; // 입력 필드 초기화
  todoInput.focus(); // 입력 필드로 커서 이동

  $li.appendChild($btn);
  $btn.innerText = '❌';

  // 삭제 버튼 클릭 시 해당 li 삭제
  $btn.addEventListener('click', (e) => {
    e.stopPropagation(); // 이벤트 전파 막기 -> li태그의 자식요소로 삭제버튼이 있기 때문에 버튼을 눌러도 완료항목으로 이동하는 문제발생
    removeTodo(li, true);
  });
  todoFlagCount(true);

  $li.addEventListener('click', () => doneTodo($li));
}

addTodoBtn.addEventListener('click', addTodo);

// 완료
function doneTodo(liItem) {
  let doneLi = document.createElement('li');
  let doneBtn = document.createElement('button');

  doneLi.innerText = liItem.innerText.replace('❌', ''); // *텍스트만 가져오기*
  doneTodoList.appendChild(doneLi);

  doneBtn.innerText = '❌';
  doneLi.appendChild(doneBtn);

  doneBtn.addEventListener('click', () => {
    removeTodo(doneLi, false);
  });
  // 원래 todo 목록에서 삭제
  liItem.remove();
  todoFlagCount(true);
  todoFlagCount(false);
}

// 할 일 삭제
function removeTodo(liItem, isTodo) {
  liItem.remove();
  todoFlagCount(isTodo);
}

// 할 일 개수 업데이트
function todoFlagCount(isTodo) {
  if (isTodo) {
    let count = todoList.getElementsByTagName('li').length;
    todoListTitle.innerText = `📋 TO DO (${count})`;
  } else {
    let count = doneTodoList.getElementsByTagName('li').length;
    doneTodoListTitle.innerText = `💿 DONE (${count})`;
  }
}
