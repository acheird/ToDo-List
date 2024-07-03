async function addTodo(data) {
  return await fetch("http://localhost:8000/todos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

async function updateProgress(data, todoId) {
  console.log("lala" + todoId);
  return await fetch(`http://localhost:8000/todos/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

// Search for a task in the todo list
async function searchTodo(data) {
  return await fetch("http://localhost:8000/todos/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

// Delete a task from the todo list
async function deleteTodo(todoId) {
  console.log("lala" + todoId);
  return await fetch(`http://localhost:8000/todos/${todoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Show tasks filtered based on completed condition
async function filterTodo(data) {
  return await fetch("http://localhost:8000/todos/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export { addTodo, updateProgress, searchTodo, deleteTodo, filterTodo };
