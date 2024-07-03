import "./App.css";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import search from "./images/search.png";
import detective from "./images/detective.png";
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
        todos[todoIndex] = newTodo;
        setTodos(todos);
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

  return (
    <>
      <div className="head">
        <h1>TODO LIST</h1>
        <div className="header">
          <div className="form-Wrapper">
            <form onSubmit={handleSearch}>
              <input
                className="search"
                placeholder="Search note..."
                type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
            </form>
            <button className="search-button" onClick={handleSearch}>
              <img src={search} />
            </button>
          </div>
          <div className="select-wrapper">
            <select className="select" onChange={handleFiltered}>
              <option value="all">ALL</option>
              <option value="completed">COMPLETED</option>
              <option value="incompleted">INCOMPLETED</option>
            </select>
            <button className="toggle"></button>
          </div>
        </div>
      </div>
      <div className="body">
        <div className="list">
          {todos.length ? (
            <ul>
              {todos.map((todo) => (
                <li key={todo.id}>
                  <div className="listElement">
                    <div>
                      <input
                        type="checkbox"
                        value={todo.completed}
                        defaultChecked={todo.completed ? true : false}
                        onClick={() =>
                          handleUpdateProgress(todo.id, "completed")
                        }
                      ></input>
                    </div>
                  </div>
                  <div className="textWrapper">
                    {" " + todo.text}
                    {" #" + todo.id}
                  </div>
                  <div>
                    <button
                      className="deleteButton"
                      onClick={() => handleDelete(todo.id)}
                    ></button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div>
              <img className="emptyListImage" src={detective} />
            </div>
          )}
        </div>
      </div>
      <div className="addButtonWrapper">
        <button className="addButton" onClick={openModal}></button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="ExampleModal"
        style={{
          content: {
            top: "30%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            border: "1px solid white",
            padding: "0px",
            "border-radius": "30px",
          },
        }}
      >
        <div className="modalContainer">
          <div className="newNote">NEW NOTE</div>
          <div className="modalForm">
            <form onSubmit={handleAddTodo}>
              <input
                className="addNote"
                placeholder="Input you note..."
                id="name"
                type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
              <div className="newNoteBtns">
                <button className="cancelButton" onClick={closeModal}>
                  CANCEL
                </button>

                <button
                  className="submitButton"
                  type="submit"
                  // disabled={value ? false : true}
                >
                  APPLY
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default App;
