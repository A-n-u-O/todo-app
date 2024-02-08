// function changeTheme(){
//     document.body.classList.toggle("light");
// }
const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");

form.addEventListener("submit", function(e) {
    e.preventDefault();
}) 
todoInput.addEventListener("keyup", function(e){
    if(e.key === "Enter"){
        let todos = JSON.parse(localStorage.getItem("list")) || []
        //add todos
        todos.push(e.target.value);
        newTodo(todoInput.value);
        todoInput.value = " ";
        console.log(todos);
    }
})


function newTodo(){
    // JSON.parse(localStorage.getItem('list'));
    for (let i = 0; i < todos.length; i++){
    const todo = document.createElement("div");
    const todoText = document.createElement("p");
    const todoCheckBox = document.createElement("input");
    const todoCheckBoxLabel = document.createElement("label");
    const todoCross = document.createElement("span");
   
    todoText.textContent = items;
    todoCheckBox.type= "checkbox";
    todoCheckBox.name= "name";
    todoCheckBoxLabel.htmlFor = "checkbox";

    todoCheckBoxLabel.addEventListener("click", function(e){
        if (todoCheckBox.checked){
            todoCheckBox.checked = false;
            todoText.style.textDecoration = "none";
            todoCheckBoxLabel.classList.remove("active");
        }else{
            todoCheckBox.checked = true;
            todoText.style.textDecoration= "line-through";
            todoCheckBoxLabel.classList.add("active");
        }
    });


    todoCross.textContent = "X";
    todoCross.addEventListener("click", function(e){
        e.target.parentElement.remove();
    })

    todo.classList.add("todo");
    todoCheckBoxLabel.classList.add("circle");
    todoCross.classList.add("cross");

    todo.appendChild(todoCheckBox);
    todo.appendChild(todoCheckBoxLabel);
    todo.appendChild(todoText);
    todo.appendChild(todoCross);
}
}
    