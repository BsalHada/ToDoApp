//Timer
const timer = document.getElementById("timer-container");
setInterval(function () {
  let date = new Date();
  timer.innerHTML = date.toLocaleTimeString();
}, 1000);

//Todo Task

const form = document.getElementById("form");
const input = document.getElementById("inputTask");
const todoLane = document.getElementById("toDo-swimlane");
const swimLanes=document.getElementsByClassName("swimlanes");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const value = input.value;

  if (!value) return;

  const newTask = document.createElement("p");
  newTask.classList.add("task");
  newTask.setAttribute("draggable", "true");
  newTask.innerText = value;

  newTask.addEventListener("dragstart", () => {
    newTask.classList.add("is-dragging");
    
  });

  newTask.addEventListener("dragend", () => {
    newTask.classList.remove("is-dragging");
    
  });

  todoLane.appendChild(newTask);
  
  input.value = "";
 
});

//drag

const draggables = document.querySelectorAll(".task");
const droppables = document.querySelectorAll(".swimlanes");

draggables.forEach((task) => {
  task.addEventListener("dragstart", () => {
    task.classList.add("is-dragging");
   
  });
  task.addEventListener("dragend", () => {
    task.classList.remove("is-dragging");
    
  });
});

droppables.forEach((zone) => {
  zone.addEventListener("dragover", (e) => {
    e.preventDefault();

    const bottomTask = insertAboveTask(zone, e.clientY);
    const curTask = document.querySelector(".is-dragging");

    if (!bottomTask) {
      zone.appendChild(curTask);
    } else {
      zone.insertBefore(curTask, bottomTask);
    }
  });
});

const insertAboveTask = (zone, mouseY) => {
  const els = zone.querySelectorAll(".task:not(.is-dragging)");
  console.log('els',els);

  let closestTask = null;
  let closestOffset = Number.NEGATIVE_INFINITY;

  console.log(closestOffset, 'offset #')

  els.forEach((task) => {
    const  {top}  = task.getBoundingClientRect();
    const offset = mouseY - top;

    console.log(offset, 'offset')

    console.log(top, 'top')

    if (offset < 0 && offset > closestOffset) {
      closestOffset = offset;
      closestTask = task;
    }
  });

  return closestTask;
};


//local storage

// function saveData() {
//     localStorage.setItem("data",input.innerHTML);
//   }
//   function showTask() {
//     swimLanes.innerText = localStorage.getItem("data");
//   }

//   showTask();

