let taskInput = $(`#task-input`);

$(`#add-Button`).on("click", render);

function render(){
   let taskContent = taskInput.val();
   let taskItem = getTaskItem(taskContent);
   $("#task-board").append(taskItem);
}

function getTaskItem(taskContent){
    let item=
    `<div class="task">
         <span>${taskContent}</span>
         <div class="button-box">
             <button> Check </button>
             <button> Delete </button>
         </div>
     </div>`
     return item;
}