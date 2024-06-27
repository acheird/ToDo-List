import "./App.css";
import { useState, useEffect } from "react";

export function App() {
  const [todos, setTodos] = useState([]);

  function handleDelete(todoId) {
    fetch(`http://localhost:8000/todos/${todoId}`, {
      method: "DELETE",
    }).then(() => {
      const remainingTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(remainingTodos);
    });
  }

  useEffect(() => {
    fetch("http://localhost:8000/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  return (
    <>
      <div className="head">
        <h1>TODO LIST</h1>
        <div className="header">
          <form>
            <input className="search" placeholder="Search note..." />
          </form>
          <select className="select">
            <option value="all">ALL</option>
            <option value="completed">Completed</option>
            <option value="incompleted">Incompleted</option>
          </select>
          <button className="toggle">Toggle</button>
        </div>
      </div>

      <div className="body">
        <div className="list">
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <button type="checkbox"></button>
                {todo.text} {todo.completed ? "(Completed)" : "(Incomplete)"}{" "}
                <button onClick={() => handleDelete(todo.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        <button className="addButton">Add</button>
      </div>
    </>
  );
}

export default App;
