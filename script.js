document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input'); // 할 일 입력 필드
    const addTodoBtn = document.getElementById('add-todo-btn'); // 할 일 추가 버튼
    const todoListBox = document.querySelector('.todo-list-box ul'); // To Do 목록
    const doneListBox = document.querySelector('.done-list-box ul'); // Done 목록
    const todoListTitle = document.getElementById('todo-list-title'); // To Do 제목
    const doneListTitle = document.getElementById('done-list-title'); // Done 제목
  
    function updateCount() {
        // 각 목록 별 갯수 표시 기능
        todoListTitle.textContent = `📋 To Do (${todoListBox.children.length})`;
        doneListTitle.textContent = `💿 Done (${doneListBox.children.length})`;
    }
  
    function createTodoItem(text) {
        // 입력받은 텍스트를 항목으로 만들어주는 함수
        const li = document.createElement('li');
        li.textContent = text;
  
        const deleteBtn = document.createElement('span');
        deleteBtn.textContent = ' 🗑️';
        
        deleteBtn.addEventListener('click', function(event) {
            // 항목 삭제 기능
            event.stopPropagation();
            li.remove();
            updateCount(); // 항목 삭제 후 갯수 업데이트
        });
  
        li.appendChild(deleteBtn);
  
        li.addEventListener('click', function() {
            // 항목 클릭 시, To Do <=> Done 이동
            if (li.parentElement === todoListBox) {
                li.classList.add('done-item');
                doneListBox.appendChild(li); // Done으로 이동
            } else {
                li.classList.remove('done-item');
                todoListBox.appendChild(li); // To Do로 이동
            }
            updateCount(); // 항목 수 업데이트
        });
  
        return li; // 만들어진 항목 반환
    }
  
    function addTodoItem() {
        // To Do에 항목 추가 및 검사
        const todoText = todoInput.value.trim();
        if (todoText !== '') { // 빈 텍스트 처리
            const todoItem = createTodoItem(todoText);
            todoListBox.appendChild(todoItem);
            todoInput.value = ''; // 입력 칸 초기화
            updateCount(); // 항목 수 업데이트
        }
    }
  
    addTodoBtn.addEventListener('click', function(event) {
        // + 버튼 클릭 시 항목 추가
        event.preventDefault();
        addTodoItem();
    });
  
    updateCount(); // 각 목록별 항목 수 업데이트 (페이지 로딩 시)
});
