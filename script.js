let todoInput = document.getElementById('todo-input'); // 할 일 입력창
let todoList = document.getElementById('todo-list'); // 할 일 리스트창
let addTodoBtn = document.getElementById('add-todo-btn'); // 버튼
let doneTodoList = document.getElementById('done-todo-list'); // 완료된 할 일 리스트창

function addTodo(event) {
  event.preventDefault();

  let $li = document.createElement('li');
  let $btn = document.createElement('button');

  if (!todoInput.value) {
    alert('공백은 입력할 수 없습니다.');
  } else {
    $li.innerText = todoInput.value;
    todoList.appendChild($li);
    todoInput.value = '';
    todoInput.focus();

    $li.appendChild($btn);
    $btn.innerText = '❌';
    $btn.style.marginLeft = '10px';
    $btn.style.background = 'none';
    $btn.style.border = 'none';

    // 삭제 버튼 클릭 시 해당 li 삭제
    $btn.addEventListener('click', (e) => {
      e.stopPropagation(); // 이벤트 전파 막기
      $li.remove();
    });
  }
  // 완료
  function doneTodo(event) {
    let doneLi = document.createElement('li');
    let doneBtn = document.createElement('button');

    doneLi.innerText = $li.innerText.replace('❌', ''); // 텍스트만 가져오기
    doneTodoList.appendChild(doneLi);

    doneBtn.innerText = '❌';
    doneBtn.style.border = 'none';
    doneBtn.style.background = 'none';
    doneBtn.style.marginLeft = '10px';
    doneLi.appendChild(doneBtn);

    doneBtn.addEventListener('click', () => {
      doneLi.remove();
    });
    // 원래 todo 목록에서 삭제
    $li.remove();
  }
  $li.addEventListener('click', doneTodo);
}

addTodoBtn.addEventListener('click', addTodo);
