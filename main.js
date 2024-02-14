let taskInput = $(`#task-input`);

// 버튼 클릭 시 render함수 호출
$(`#add-Button`).on("click", render);
$('#task-input').keypress(function(e) { // Enter키 누르면 render함수 호출
    if (e.which === 13) { 
        render();
    }
});

// 랜덤 번호(ID값) 생성
function randomIdGenerate(){
    return '_' + Math.random().toString(36).substring(2,9)
}

function render(){
   //객체생성
   let task = {
        id: randomIdGenerate(),
        taskContent: taskInput.val()
   }
   //가져온 값 taskItem에 넣고 보드에 뿌려주기
   let taskItem = getTaskItem(task);
   $("#task-board").append(taskItem);
   //인풋필드 비우기
   taskInput.val("");
}

// 입력값 가져오기
function getTaskItem(task){
    let item=
    `<div class="task" id="taskItem-${task.id}">
         <span>${task.taskContent}</span>
         <div class="button-box">
             <button onclick="toggleComplete('${task.id}')"> Check </button>
             <button onclick="deleteTask('${task.id}')"> Delete </button>
         </div>
     </div>`
     return item;
}

// 할일 완료 표시
function toggleComplete(id){
    // id값이 동일한 아이템 선택
    let Status = $(`#taskItem-${id}`);
    // css적용
    if(Status.hasClass("task-done")){ 
        Status.removeClass("task-done");
    } else {
        Status.addClass("task-done");
    }
}

// 할일 삭제하기
function deleteTask(id){
    $(`#taskItem-${id}`).remove();
}