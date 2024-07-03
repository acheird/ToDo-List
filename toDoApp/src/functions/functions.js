export const handleTodoSubmit = async (value, todos, setTodos, setValue) => {
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
  

export const handleUpdateProgress = async (todoId, field, todos, setTodos) => {

    try{
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

            if(response.ok) {
                const newTodo = await response.json();
                todos[todoIndex] = newTodo;
                setTodos(todos);
            } else {
                console.error("Error updating todo:", response.statusText);
              }
            } catch (error) {
              console.error("An error occurred:", error);
            }
    };


export const handleSearch = async (value, setTodos, setValue) => {
    try{
        const searchingWord = value;

        const response = await fetch("http://localhost:8000/todos/", {
            method: "GET",
            });

            if(response.ok) {
                const newTodo = await response.json();
                let fetchedTodos = newTodo;
                const remainingTodos = fetchedTodos.filter((todo) =>
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
};