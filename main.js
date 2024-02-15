let taskInput = $(`#task-input`);
let taskBoard = $(`#task-board`);

// 버튼 클릭 시 render, scrollBottom 호출
$(`#add-Button`).on("click", function(){
    render();
    scrollBottom();
});

// Enter키 설정
$('#task-input').keypress(function(e) { 
    if (e.which === 13) { 
        render();
        scrollBottom();
    }
});

// 탭 버튼 클릭(all, ing, completed)
$(`.task-tabs div`).on("click", function() {
    let select = $(this).attr("id");
    filter(select);
});

// 스크롤 위치를 하단으로 변경하는 함수
function scrollBottom(){
    // console.log("나 호출됨?")
    // console.log(taskBoard.prop("scrollHeight"));
    // console.log(taskBoard.scrollTop());
    taskBoard.scrollTop(taskBoard.prop("scrollHeight"));
}

// 랜덤 번호(ID값) 생성
function randomIdGenerate(){
    return '_' + Math.random().toString(36).substring(2,9)
}

// 할일 등록하기
function render(){
    if(taskInput.val()==""){
        // 유효성 체크(빈값)
        $(`#complete-Button`).prop("disabled",true);
    }else{
        //객체생성
        let task = {
            id: randomIdGenerate(),
            taskContent: taskInput.val()
        }
        console.log(task);

        //가져온 값 taskItem에 넣고 보드에 뿌려주기
        let taskItem = getTaskItem(task);
        $("#task-board").append(taskItem);
        //인풋필드 비우기
        taskInput.val("");
    }
}

// 입력값 가져오기
function getTaskItem(task){
    let item=
    `<div class="task" id="taskItem-${task.id}">
         <span>${task.taskContent}</span>
         <div class="button-box">
             <button id= "complete-Button" onclick="toggleComplete('${task.id}')"> Check </button>
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

// ALl, ING, COMPLETED 필터
function filter(select){
    if(select === "all"){
      viewAll();
    } else if(select === "ing"){
      viewIngTasks();
    } else if(select === "completed"){
      viewCompletedTasks();
    }
  }

// All
function viewAll() {
    $(".task").show();
  }

// Ing
function viewIngTasks() {
    $(".task").hide();
    $(".task:not(.task-done)").show();
  }

// Completed
function viewCompletedTasks() {
    $(".task").hide();
    $(".task.task-done").show();
  }

// 할일 삭제하기
function deleteTask(id){
    $(`#taskItem-${id}`).remove();
}