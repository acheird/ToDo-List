import "./App.css";
import { useState, useEffect } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export function App() {
  const [todos, setTodos] = useState([]);
  let [value, setValue] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  function handleSubmit(event) {
    event.preventDefault();
    const newId =
      todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;

    fetch("http://localhost:8000/todos/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: newId.toString(),
        text: value,
        completed: false,
      }),
    })
      .then((response) => response.json())
      .then((newTodo) => setTodos([...todos, newTodo]))
      .finally(() => {
        setValue("");
      });
  }

  function handleDelete(todoId) {
    fetch(`http://localhost:8000/todos/${todoId}`, {
      method: "DELETE",
    }).then(() => {
      const remainingTodos = todos.filter((todo) => todo.id !== todoId);
      setTodos(remainingTodos);
    });
  }

  function handleSelectChange(event) {
    event.preventDefault();

    console.log(event.target.value);
    const results = event.target.value;

    fetch(`http://localhost:8000/todos/`, {
      method: "GET",
    }).then(() => {
      console.log(todos);
      if (results === "all") {
        // console.log(todos);
        setTodos(todos);
      } else if (results === "completed") {
        const remainingTodos = todos.filter((todo) => todo.completed);
        // console.log(todos);
        setTodos(remainingTodos);
      } else if (results === "incompleted") {
        const remainingTodos = todos.filter((todo) => !todo.completed);
        // console.log(todos);
        setTodos(remainingTodos);
      }
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
          <select className="select" onChange={handleSelectChange}>
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
        <button className="addButton" onClick={openModal}>
          Add
        </button>
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
          },
        }}
      >
        <form onSubmit={handleSubmit}>
          <input
            placeholder="Input you note"
            id="name"
            type="text"
            value={value}
            onChange={(event) => setValue(event.target.value)}
          />
          <div>
            <button onClick={closeModal}>CANCEL</button>
          </div>
          <div>
            <button type="submit" disabled={value ? false : true}>
              APPLY
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default App;
