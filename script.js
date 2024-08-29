// 다들 화이팅!! ٩( *˙0˙*)۶
const todoInput = document.querySelector('#todo-input'); //입력창
const addBtn = document.querySelector('#add-button'); //+ 버튼
const todoList = document.querySelector('#todo-list'); //TO DO
const doneList = document.querySelector('#done-list'); //DONE
const todoTitle = document.querySelector('.todo-box .todo-list-title'); // TO DO 제목
const doneTitle = document.querySelector('.done-box .done-list-title'); // DONE 제목

addBtn.addEventListener('click', () => {
  //+ 버튼으로 추가
  if (todoInput.value !== '') addToDo();
});

function addToDo() {
  let todoContents = todoInput.value;

  const li = document.createElement('li');
  const span = document.createElement('span');
  const btn = document.createElement('button');

  li.appendChild(span); //appendChild() : 선택한 요소 안에 자식요소를 추가
  li.appendChild(btn);

  span.textContent = todoContents; //textContent : 노드 내의 모든 텍스트 추출
  btn.textContent = '✖️';

  todoList.appendChild(li);

  todoInput.value = '';

  updateCount();

  //완료
  span.addEventListener('click', () => {
    li.classList.toggle('complete');
    if (li.classList.contains('complete')) {
      doneList.appendChild(li);
    } else {
      todoList.appendChild(li);
    }
    updateCount();
  });

  //삭제
  btn.addEventListener('click', () => {
    li.remove();
    updateCount();
  });
}

function updateCount() {
  const todoCount = todoList.children.length;
  const doneCount = doneList.children.length;

  todoTitle.textContent = `📝 TO DO (${todoCount})`;
  doneTitle.textContent = `✔️ DONE (${doneCount})`;
}
