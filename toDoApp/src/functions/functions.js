export const handleSubmit = async (value, todos, setTodos, setValue) => {
    try {
      const newId = todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
  
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
  };
  