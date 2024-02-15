let taskInput = $(`#task-input`);
let dateInput = $(`#date-input`);
let taskBoard = $(`#task-board`);
let underLine = $(`#tab-underline`);
let sortStatus = true; // 정렬 방향

// 버튼 클릭 시 render, scrollBottom 호출
$(`#add-Button`).on("click", function(){
    render();
    scrollBottom();
}); 

// Enter키 설정
$('.enter-press').keypress(function(e) { 
    if (e.which === 13) { 
        render();
        scrollBottom();
    }
});

// 탭 버튼 클릭(all, ing, completed)
$(`.task-tabs div`).on("click", function() {
    // 탭 버튼의 id값 할당
    let select = $(this).attr("id");
    moveUnderline(select);
    tabsFilter(select);
});

// 정렬 
$(`#sort-icon`).on("click", function(){
    sortByDeadline();
})

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
            taskContent: taskInput.val(),
            taskDeadline: dateInput.val()
        }
        console.log(task);
        //가져온 값 taskItem에 넣고 보드에 뿌려주기
        let taskItem = getTaskItem(task);
        $("#task-board").append(taskItem);
        //인풋필드 비우기
        taskInput.val("");
        dateInput.val("");
    }
}

// 입력값 가져오기
function getTaskItem(task){
    let item=
    `<div class="task" id="taskItem-${task.id}">
         <span>${task.taskContent}</span>
         <div class="button-box">
             <span class="dateView" id="t-deadline"> ${task.taskDeadline} </span>
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

// 언더바 이동 함수
function moveUnderline(select){
    // 탭버튼 id 값
    let button = $(`#${select}`);

    if(button.length > 0){ // 조건식이 없으면 정렬 아이콘 클릭시 에러메세지 발생
        // 탭버튼 좌표정보 가져오기
        let buttonPosition = button.position();

        underLine.animate({
            // left위치와 너비 설정, 이동속도는 100밀리초
            left: buttonPosition.left,
            width: button.outerWidth()
        }, 100);
    }
}

// ALl, ING, COMPLETED 필터
function tabsFilter(select){
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

// 데드라인 임박 task view
function comeDeadline() {
    // 현재 날짜
    let today = new Date();

    // task클래스를 가진 요소들 순회
    $(".task").each(function () { 
        // "2024-02-15"와 같은 날짜를 new date()함수 사용하여 새 변수 할당
        let dLine = new Date($(this).find(".dateView").text());
        // 마감기한 - 오늘날짜 계산, getTime()은 현재시간을 밀리초로 반환
        let diff = Math.abs(dLine.getTime()-today.getTime());
        // 따라서 하루를 밀리초로 나타내기 위해 1000을 곱함
        diff = Math.ceil(diff / (1000 * 60 * 60 * 24));
        
        if(diff<3){
            $(this).find(".dateView").toggleClass("deadline");
        }
    }); 
}

// 마감기한 순 정렬
function sortByDeadline() {
    let tasks = $(".task");

    tasks.sort(function (a, b) {
        let dateA = new Date($(a).find(".dateView").text());
        let dateB = new Date($(b).find(".dateView").text());

        // 마감기한이 비어있는 경우
        if (isNaN(dateA)) {
            return sortStatus ? 1 : -1;
        } else if (isNaN(dateB)) {
            return sortStatus ? -1 : 1;
        }

        return sortStatus ? dateA - dateB : dateB - dateA;
    });
    $("#task-board").empty().append(tasks);
    sortStatus = !sortStatus; // toggle기능
}