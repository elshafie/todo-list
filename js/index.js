

const todos = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];


const todosContainer = document.getElementById("todos");


document.addEventListener('DOMContentLoaded', () => {
  getTodos()
})


const form = document.getElementById("todo-form");


const handleSubmit = (e) => {
  e.preventDefault();

  const todoInput = document.getElementById("todoInput");
  if (todoInput.value==='') {
    alert("Please enter a todo");
  }else{
    const newTodo = {
      id: crypto.randomUUID(),
      content: todoInput.value,
      complete: false,
    };

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.id = newTodo.id;

    const todoP = document.createElement("p");
    todoP.textContent = newTodo.content;
    todoDiv.appendChild(todoP);

    const buttonsDiv = document.createElement("div");
    buttonsDiv.classList.add("buttons");
    const checkboxDiv = document.createElement("div");
    checkboxDiv.classList.add("checkbox");
    checkboxDiv.innerHTML = "&check;";
    checkboxDiv.addEventListener("click", () => {
      updateStatus(newTodo.id);
    });

    const editButton = document.createElement("button");
    editButton.classList.add("edit");
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      editTodo(newTodo.id);
    });

    deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener("click", () => {
      deleteTodo(newTodo.id);
    });

    buttonsDiv.appendChild(checkboxDiv);
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton);

    todoDiv.appendChild(buttonsDiv);

    todosContainer.appendChild(todoDiv);

    addTodo(newTodo);
    todoInput.value = "";
  }
};



form.addEventListener('submit', handleSubmit)

const getTodos = () => {
  todos.map((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    todoDiv.id= todo.id

    const todoP = document.createElement('p')
    todoP.textContent = todo.content;
    todoP.style.textDecoration = todo.complete ? "line-through" : "none";
    todoDiv.appendChild(todoP)

    const buttonsDiv = document.createElement('div')
    buttonsDiv.classList.add('buttons')
    const checkboxDiv = document.createElement('div')
    checkboxDiv.classList.add('checkbox')
    checkboxDiv.id = "checkbox"
    checkboxDiv.innerHTML = '&check;'
    checkboxDiv.addEventListener('click', () => {
      updateStatus(todo.id);
    })


    const editButton = document.createElement("button");
    editButton.classList.add('edit')
    editButton.textContent = "Edit";
    editButton.addEventListener("click", () => {
      editTodo(todo.id);
    });


    const deleteButton = document.createElement('button')
    deleteButton.textContent = 'Delete'
    deleteButton.addEventListener('click',() => {
      deleteTodo(todo.id)
    })

    buttonsDiv.appendChild(checkboxDiv)
    buttonsDiv.appendChild(editButton);
    buttonsDiv.appendChild(deleteButton)

    todoDiv.appendChild(buttonsDiv);

    todosContainer.appendChild(todoDiv)
  })
}


const addTodo = (todo) => {
  todos.push(todo)
  localStorage.setItem("todos", JSON.stringify(todos))
}



const updateStatus = async (id) => {

  const todosupdate = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  const updatedTodos = await todosupdate?.map((todo) => {

    if (todo.id === id) {
      document.getElementById(id).children[0].style.textDecoration =
        todo.complete ? "none" : "line-through";
      return { ...todo, complete: !todo.complete };
    }
    return todo;
  });

  localStorage.setItem("todos", JSON.stringify(updatedTodos));
}



const editTodo = async(id) => {

  console.log(id)

  const todosedit = localStorage.getItem("todos")
    ? JSON.parse(localStorage.getItem("todos"))
    : [];

  form.style.display = 'none'
  const editForm = document.getElementById("edit-form");
  editForm.style.display = 'block'

  const todoValue = todosedit.filter((todo) => {
    if (todo.id === id) {
      
      return todo;
    }
  });

  document.getElementById("todo-id").value = id;

  document.getElementById("todoEditInput").value = todoValue[0].content;
}

document
  .getElementById("update-button")
  .addEventListener("click", async (e) => {

    const todoId = document.getElementById("todo-id").value;
    const todosedit = localStorage.getItem("todos")
      ? JSON.parse(localStorage.getItem("todos"))
      : [];
      
    const editedValue = document.getElementById("todoEditInput");
    console.log(editedValue.value);

    const editedTodos = await todosedit?.map((todo) => {
      if (todo.id === todoId) {
        document.getElementById(todoId).children[0].textContent =
          editedValue.value;
        return { ...todo, content: editedValue.value };
      }
      return todo;
    });

    localStorage.setItem("todos", JSON.stringify(editedTodos));

    document.getElementById("edit-form").style.display = "none";
    form.style.display = "block";
  });



const deleteTodo = async(id) => {
  if (confirm("Are you sure to delete this todo")){
    const editedTodos = await todos?.filter((todo) => {
      return todo.id !== id;
    });

    const existTodo = document.getElementById(id)
    existTodo.style.display= "none"

    localStorage.setItem("todos", JSON.stringify(editedTodos));
  }
}
