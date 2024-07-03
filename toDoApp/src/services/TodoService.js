// Add a new task to the todo list
async function handleTodoSubmit(value, todos, setTodos, setValue) {
  try {
    const newId =
      todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;

    const response = await fetch("http://localhost:8000/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: newId.toString(),
        text: value,
        completed: false,
      }),
    });

    if (response.ok) {
      const newTodo = await response.json();
      setTodos([...todos, newTodo]);
      setValue(""); // Clear the input value
    } else {
      console.error("Error adding todo:", response.statusText);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Update todo task progress (Completed/Incompleted)
async function handleUpdateProgress(todoId, field, todos, setTodos) {
  try {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);

    const response = await fetch(`http://localhost:8000/todos/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        [field]: !todos[todoIndex][field],
      }),
    });

    if (response.ok) {
      const newTodo = await response.json();
      todos[todoIndex] = newTodo;
      setTodos(todos);
    } else {
      console.error("Error updating todo:", response.statusText);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Search for a task in the todo list
async function handleSearch(value, setTodos, setValue) {
  try {
    const searchingWord = value;

    const response = await fetch("http://localhost:8000/todos/", {
      method: "GET",
    });

    if (response.ok) {
      const newTodos = await response.json();
      const remainingTodos = newTodos.filter((todo) =>
        todo.text.includes(searchingWord)
      );
      setTodos(remainingTodos);
      setValue("");
    } else {
      console.error("Error updating todo:", response.statusText);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Delete a task from the todo list
async function handleDelete(todoId, todos, setTodos) {
  try {
    const response = await fetch(`http://localhost:8000/todos/${todoId}`, {
      method: "DELETE",
    });

    if (response.ok) {
      const remainingTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(remainingTodos);
    } else {
      console.error("Error updating todo:", response.statusText);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

// Show tasks filtered based on completed condition
async function handleFiltered(value, todos, setTodos) {
  const results = value;
  try {
    const response = await fetch(`http://localhost:8000/todos/`, {
      method: "GET",
    });

    if (response.ok) {
      const fetchedTodos = await response.json();
      if (results === "all") {
        setTodos(fetchedTodos);
      } else if (results === "completed") {
        const remainingTodos = fetchedTodos.filter((todo) => todo.completed);
        console.log(remainingTodos);
        setTodos(remainingTodos);
      } else if (results === "incompleted") {
        const remainingTodos = fetchedTodos.filter((todo) => !todo.completed);
        console.log(remainingTodos);
        setTodos(remainingTodos);
      }
    } else {
      console.error("Error updating todo:", response.statusText);
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

export {
  handleTodoSubmit,
  handleUpdateProgress,
  handleSearch,
  handleDelete,
  handleFiltered,
};
