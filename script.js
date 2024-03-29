document.addEventListener("DOMContentLoaded", function() {
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");

form.addEventListener("submit", function (e) {
  e.preventDefault();
});

todoInput.addEventListener("keyup", function (e) {
let todos = JSON.parse(localStorage.getItem("list")) || [];
  if (e.key === "Enter") {
    todos.push({
      value: e.target.value,
      checked: false,
    });

    displayTodos(todos);

    localStorage.setItem("list", JSON.stringify(todos));

    todoInput.value = "";
  }
});

function displayTodos(todos) {
  const todosWrapper = document.querySelector(".todos");
  while (todosWrapper.firstChild) {
    todosWrapper.removeChild(todosWrapper.firstChild);
  }

  todos.forEach((item, index) => {
    const todo = createTodoElement(item, index);
    todosWrapper.appendChild(todo);
  });

  const checkboxes = document.querySelectorAll(".checkbox");
  checkboxes.forEach((chk) => {
    chk.addEventListener("click", (e) => {
      const updatedArray = todos.map((item, index) => {
        if (`${item.value}-${index}` === e.srcElement.name) {
          return { ...item, checked: e.srcElement.checked };
        } else {
          return item;
        }
      });
      localStorage.setItem("list", JSON.stringify(updatedArray));
      displayTodos(updatedArray);
    });
  });
}

// All button
const all = document.getElementById("all");
all.addEventListener("click", function (e) {
let todos = JSON.parse(localStorage.getItem("list")) || [];
  displayTodos(todos);
});

// Active button
const active = document.getElementById("active");
active.addEventListener("click", function (e) {
let todos = JSON.parse(localStorage.getItem("list")) || [];
  const filteredTodos = todos.filter((item) => !item.checked);
  displayTodos(filteredTodos);
});

// Completed button
const completed = document.getElementById("completed");
completed.addEventListener("click", function (e) {
let todos = JSON.parse(localStorage.getItem("list")) || [];
  const completedTodos = todos.filter((item) => item.checked);
  displayTodos(completedTodos);
});

//clear completed
const clearCompleted = document.getElementById("clearCompleted");
clearCompleted.addEventListener("click", function(e){
    let todos = JSON.parse(localStorage.getItem("list")) || [];
    const completedTodos = todos.filter(item => item.checked);
    completedTodos.forEach(completedTodo => {
        // Remove the completed todo from the todos array
        todos = todos.filter(todo => todo !== completedTodo);
    });

    // Update localStorage and display remaining todos
    localStorage.setItem("list", JSON.stringify(todos));
    displayTodos(todos);
});

function createTodoElement(item, index) {
    const todo = document.createElement("div");
    const todoCheckBox = document.createElement("input");
    const todoText = document.createElement("label");
    const todoCross = document.createElement("span");
    const todoCrosssvg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
todoCrosssvg.setAttribute("viewBox", "0 0 24 24");
todoCrosssvg.setAttribute("fill", "none");
todoCrosssvg.innerHTML = `
  <path d="M17.25 17.25L6.75 6.75" stroke="hsl(234, 11%, 52%)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
  <path d="M17.25 6.75L6.75 17.25" stroke="hsl(234, 11%, 52%)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
`;
todoCross.appendChild(todoCrosssvg);

    todoText.textContent = item.value;
    todoCheckBox.type = "checkbox";
    todoCross.setAttribute("data-id", `${item.value}-${index}`);
    todoCheckBox.addEventListener("click", function (e) {
      todoText.style.textDecoration = e.target.checked ? "line-through" : "none";
      todoCheckBox.classList.toggle("active", e.target.checked);
  
      let todos = JSON.parse(localStorage.getItem("list")) || [];
      const updatedtodos = todos.map((t, i) => {
        if (`${t.value}-${i}` === e.srcElement.name) {
          return { ...t, checked: e.srcElement.checked };
        } else {
          return t;
        }
      });
  
      localStorage.setItem("list", JSON.stringify(updatedtodos));
    });
  
    todoCross.textContent = "X";
    todoCross.addEventListener("click", function (e) {
      const del = e.target.getAttribute("data-id");
      let todos = JSON.parse(localStorage.getItem("list")) || [];
      const updatedtodos = todos.filter((t, i) => `${t.value}-${i}` !== del);
      displayTodos(updatedtodos);
      localStorage.setItem("list", JSON.stringify(updatedtodos));
    });
  
    todo.classList.add("todo");
    todoCheckBox.classList.add("circle", "checkbox"); // Add both classes here
    todoCross.classList.add("remove-task");
  
    todo.appendChild(todoCheckBox);
    todo.appendChild(todoText);
    todo.appendChild(todoCross);
  
    todoCheckBox.name = `${item.value}-${index}`;
    todoText.htmlFor = `${item.value}-${index}`;
    todoText.textContent = item.value;
  
    todoCheckBox.checked = item.checked;
  
    if (item.checked) {
      todo.classList.add("label"); // Add the "label" class for completed todos
    }
  
    return todo;
  }
  
function displayFilteredTodos(filteredTodos) {
  while (todosWrapper.firstChild) {
    todosWrapper.removeChild(todosWrapper.firstChild);
  }

  filteredTodos.forEach((item, index) => {
    const todo = createTodoElement(item, index);
    todosWrapper.appendChild(todo);
  });
  styleActiveTodos(filteredTodos);
}

function displayCompletedTodos(completedTodos) {
    while (todosWrapper.firstChild) {
        todosWrapper.removeChild(todosWrapper.firstChild);
      }
    
      completedTodos.forEach((item, index) => {
        const todo = createTodoElement(item, index);
        todosWrapper.appendChild(todo);
      });
      styleCompletedTodos(completedTodos);
}
function styleCompletedTodos(completedTodos) {
    completedTodos.forEach(todo => {
        const todoElement = document.querySelector(`[data-id="${todo.value}-${todo.index}"]`);
        if (todoElement) {
            todoElement.classList.add("label");
        }
    });
}

function styleActiveTodos(activeTodos) {
    activeTodos.forEach(todo => {
        const todoElement = document.querySelector(`[data-id="${todo.value}-${todo.index}"]`);
        if (todoElement) {
            todoElement.classList.remove("label");
        }
    });
}

// Load event listener
window.addEventListener(
  "load",
  displayTodos(JSON.parse(localStorage.getItem("list")) || [])
);

  });
  