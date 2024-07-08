import "./App_dark.css";
// import "./App_light.css";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import List from "./components/List";
import AddModal from "./components/AddModal";
import Form from "./components/Form";

import {
  addTodo,
  updateProgress,
  searchTodo,
  deleteTodo,
  filterTodo,
} from "./services/TodoService";

Modal.setAppElement("#root");

export function App() {
  const [todos, setTodos] = useState([]);
  let [value, setValue] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  useEffect(() => {
    fetch("http://localhost:8000/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  // Add a new task to the todo list
  async function handleAddTodo(event) {
    event.preventDefault();

    const newId =
      todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
    try {
      const response = await addTodo({
        id: newId.toString(),
        text: value,
        completed: false,
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

  // Search for a task in the todo list
  async function handleSearch(event) {
    event.preventDefault();
    const searchingWord = value;
    try {
      const response = await searchTodo();

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

  // Update todo task progress (Completed/Incompleted)
  async function handleUpdateProgress(todoId, field) {
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    try {
      const response = await updateProgress(
        {
          [field]: !todos[todoIndex][field],
        },
        todoId
      );

      if (response.ok) {
        const newTodo = await response.json();
        // todos[todoIndex] = newTodo;
        const newTodos = [...todos];
        newTodos[todoIndex] = newTodo;
        new setTodos(newTodos);
      } else {
        console.error("Error updating todo:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  // Delete a task from the todo list
  async function handleDelete(todoId) {
    try {
      console.log(todoId);
      const response = await deleteTodo(todoId);
      console.log(response);

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
  async function handleFiltered(event) {
    event.preventDefault();
    const results = event.target.value;
    try {
      const response = await filterTodo();

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

  const [mode, setMode] = useState("");

  const changeColor = () => {
    //Toggle between colors
    setMode(mode === "root-dark" ? "root-light" : "root-dark");
  };

  return (
    <div className={mode}>
      <div className="mainContainer">
        <Form
          value={value}
          setValue={setValue}
          handleSearch={handleSearch}
          handleFiltered={handleFiltered}
          changeColor={changeColor}
        />
        <div className="body">
          <List
            todos={todos}
            handleUpdateProgress={handleUpdateProgress}
            handleDelete={handleDelete}
          />
        </div>
        <div className="addButtonWrapper">
          <button className="addButton" onClick={openModal}></button>
        </div>

        <AddModal
          isOpen={modalIsOpen}
          closeModal={closeModal}
          value={value}
          setValue={setValue}
          handleAddTodo={handleAddTodo}
          mode={mode}
        />
      </div>
    </div>
  );
}

export default App;
