let taskInput = $(`#task-input`);

$(`#add-Button`).on("click", complete);
$('#task-input').keypress(function(e) { // Enter키 누르면 render함수 호출
    if (e.which === 13) { 
        complete();
    }
});

function randomIdGenerate(){
    return '_' + Math.random().toString(36).substring(2,9)
}

function complete(){
   let task = {
        id: randomIdGenerate(),
        taskContent: taskInput.val()
   } 
   console.log(task);
   let taskItem = getTaskItem(task);
   $("#task-board").append(taskItem);
   taskInput.val("");
}

function getTaskItem(task){
    let item=
    `<div class="task" id="taskItem-${task.id}">
         <span>${task.taskContent}</span>
         <div class="button-box">
             <button onclick="toggleComplete('${task.id}')"> Check </button>
             <button onclick="deleteTask()"> Delete </button>
         </div>
     </div>`
     return item;
}

function toggleComplete(id){
    
    let Status = $(`#taskItem-${id}`);

    if(Status.hasClass("task-done")){ 
        Status.removeClass("task-done");
    } else {
        Status.addClass("task-done");
    }
}

function deleteTask(){
    console.log("삭제하다");
}