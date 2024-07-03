import "./App.css";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import search from "./images/search.png";
import detective from "./images/detective.png";
import {
  handleTodoSubmit,
  handleUpdateProgress,
  handleSearch,
  handleDelete,
  handleSelectChange,
} from "./functions/functions";

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

  // Update todo task progress (Completed/Incompleted)
  const progressUpdate = (todoId, field) => {
    handleUpdateProgress(todoId, field, todos, setTodos);
  };

  // Add a new task to the todo list
  const addTodo = (event) => {
    event.preventDefault();
    handleTodoSubmit(value, todos, setTodos, setValue);
  };

  // Search for a task in the todo list
  const searchTodo = (event) => {
    event.preventDefault();
    handleSearch(value, setTodos, setValue);
  };

  // Delete a task from the todo list
  const deleteTodo = (todoId) => {
    handleDelete(todoId, todos, setTodos);
  };

  // Show tasks filtered based on completed condition
  function filterTodos(event) {
    event.preventDefault();
    const results = event.target.value;
    handleSelectChange(results, todos, setTodos);
  }

  return (
    <>
      <div className="head">
        <h1>TODO LIST</h1>
        <div className="header">
          <div className="form-Wrapper">
            <form onSubmit={searchTodo}>
              <input
                className="search"
                placeholder="Search note..."
                type="text"
                value={value}
                onChange={(event) => setValue(event.target.value)}
              />
            </form>
            <button className="search-button" onClick={searchTodo}>
              <img src={search} />
            </button>
          </div>
          <div className="select-wrapper">
            <select className="select" onChange={filterTodos}>
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
                        onClick={() => progressUpdate(todo.id, "completed")}
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
                      onClick={() => deleteTodo(todo.id)}
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
            top: "50%",
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
            <form onSubmit={addTodo}>
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
                  //disabled={!!value}
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
