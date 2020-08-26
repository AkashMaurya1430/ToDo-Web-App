//Setting up local Storage
if (window.localStorage.getItem("toDoList") == undefined) {
  var toDoList = [];
  window.localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

var todosEX = window.localStorage.getItem("toDoList");
var toDoList = JSON.parse(todosEX);

// Add item to list
function addItem() {
  input = document.getElementById("itemValue");
  const item = {
    title: input.value,
    id: Date.now(),
    completed: false,
  };
  toDoList.push(item);
  window.localStorage.setItem("toDoList", JSON.stringify(toDoList));
  // console.log(toDoList);
  input.value = "";
  createList(item);
}

// Delete item from list
function deleteItem(item) {
  toDoList = toDoList.filter((ele) => ele.id !== item);
  window.localStorage.setItem("toDoList", JSON.stringify(toDoList));
  listItem = document.getElementById(`${item}`);
  listItem.parentNode.removeChild(listItem);
}

// mark item as completed
function checkCompleted(item) {
  listItem = document.getElementById(`${item}`);
  listItem.classList.toggle("completed");
  inputField = document.getElementById(`editInp${item}`);
  inputField.classList.toggle("lineThrough");
  inputField.readOnly = true;
  object = toDoList.find((someobject) => someobject.id == item);
  object.completed = object.completed ? false : true;
  window.localStorage.setItem("toDoList", JSON.stringify(toDoList));
}

// edit list item
function editItem(item) {
  inputField = document.getElementById(`editInp${item}`);
  // inputField.readOnly = inputField.readOnly
  //   ? (inputField.readOnly = false)
  //   : (inputField.readOnly = true);
  if (inputField.readOnly) {
    inputField.readOnly = false;
    document.getElementById(`editBtn${item}`).classList.toggle("btn-success");
    document.getElementById(`editBtn${item}`).classList.toggle("btn-warning");
    document.getElementById(`editBtn${item}`).innerHTML =
      '<i class="fas fa-check"></i>';
  } else {
    document.getElementById(`editBtn${item}`).classList.toggle("btn-success");
    document.getElementById(`editBtn${item}`).classList.toggle("btn-warning");
    document.getElementById(`editBtn${item}`).innerHTML =
      '<i class="fas fa-pen"></i>';
    inputField.readOnly = true;
  }

  toDoList.find((someobject) => someobject.id == item).title = inputField.value;
  window.localStorage.setItem("toDoList", JSON.stringify(toDoList));
  inputField.focus();
}

// create list item
function createList(item) {
  if (item.title === "") {
    return;
  }
  taskList = document.getElementById("taskList");
  node = document.createElement("li");
  node.className = "taskItems";
  node.setAttribute("id", item.id);
  node.innerHTML = `
      <div class="taskCheckbox">
        <input type="checkbox" class="mt-2" id="checkbox${item.id}" onclick="checkCompleted(${item.id})" />
      </div>
      <div class="task">
      <input class="taskTitle" id="editInp${item.id}" type="text" value="${item.title}" readonly />
        <div class="buttons">
          <div class="btn btn-warning taskBtn mr-1" id="editBtn${item.id}" onclick="editItem(${item.id})">
            <i class="fas fa-pen"></i>
          </div>
          <div class="btn btn-danger taskBtn" onclick="deleteItem(${item.id})">
            <i class="fas fa-trash"></i>
          </div>
        </div>
      </div>`;
  taskList.appendChild(node);
  if (item.completed) {
    checkCompleted(item.id);
    item.completed = true;
    document.getElementById(`checkbox${item.id}`).checked = true;
    window.localStorage.setItem("toDoList", JSON.stringify(toDoList));
  }
}

// Creating Items Based on previous list from local Storage
for (var v = 0; v < toDoList.length; v++) {
  createList(toDoList[v]);
}

// Adding items in list on enter
document
  .getElementById("itemValue")
  .addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      if (document.getElementById("itemValue").value !== "") {
        addItem();
      }
    }
  });
