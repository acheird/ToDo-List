// Create a new record
function addTodo(data) {
  return fetch("http://localhost:8000/todos/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

// Search in existing records
function searchTodo(data) {
  return fetch("http://localhost:8000/todos/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

// Update a specific field of a record with a specific id
function updateProgress(data, todoId) {
  return fetch(`http://localhost:8000/todos/${todoId}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

// Delete the record with the given Id
function deleteTodo(todoId) {
  return fetch(`http://localhost:8000/todos/${todoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

// Filter existing records
function filterTodo(data) {
  return fetch("http://localhost:8000/todos/", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export { addTodo, updateProgress, searchTodo, deleteTodo, filterTodo };
