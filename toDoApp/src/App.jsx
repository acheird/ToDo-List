import "./App.css";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import search from "./images/search.png";

Modal.setAppElement("#root");

export function App() {
  const [todos, setTodos] = useState([]);
  let [value, setValue] = useState("");

  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  function updateField(todoId, field) {
    console.log(todoId);
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    fetch(`http://localhost:8000/todos/${todoId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        // ...todos[todoIndex],
        [field]: !todos[todoIndex][field],
      }),
    })
      .then((response) => response.json())
      .then((todo) => {
        todos[todoIndex] = todo;
        setTodos(todos);
      });
  }

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
    const results = event.target.value;

    if (results === "all") {
      // console.log(todos);
      fetch(`http://localhost:8000/todos/`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((newTodo) => {
          let lala = newTodo;
          console.log(lala);
          setTodos(lala);
        });
    } else if (results === "completed") {
      fetch(`http://localhost:8000/todos/`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((newTodo) => {
          let lala = newTodo;
          const remainingTodos = lala.filter((todo) => todo.completed);
          console.log(remainingTodos);
          setTodos(remainingTodos);
        });
    } else if (results === "incompleted") {
      fetch(`http://localhost:8000/todos/`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((newTodo) => {
          let lala = newTodo;
          const remainingTodos = lala.filter((todo) => !todo.completed);
          console.log(remainingTodos);
          setTodos(remainingTodos);
        });
    }
  }

  function handleSearch(event) {
    event.preventDefault();
    const text1 = value;
    console.log(text1);
    fetch(`http://localhost:8000/todos/`, {
      method: "GET",
    })
      .then((response) => response.json())
      .then((newTodo) => {
        let lala = newTodo;
        const remainingTodos = lala.filter((todo) => todo.text.includes(text1));
        setTodos(remainingTodos);
      })
      .finally(() => {
        setValue("");
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
          <form onSubmit={handleSearch}>
            <input
              className="search"
              placeholder="Search note..."
              type="text"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
          </form>
          <button className="search-button">
            <img src={search} />
          </button>
          <select className="select" onChange={handleSelectChange}>
            <option value="all">ALL</option>
            <option value="completed">Completed</option>
            <option value="incompleted">Incompleted</option>
          </select>
          <button className="toggle"></button>
        </div>
      </div>
      <div className="body">
        <div className="list">
          <ul>
            {todos.map((todo) => (
              <li key={todo.id}>
                <input
                  className="list-item"
                  type="checkbox"
                  value={todo.completed}
                  defaultChecked={todo.completed ? true : false}
                  onClick={() => updateField(todo.id, "completed")}
                ></input>
                {todo.text}
                {" #" + todo.id}
                <button
                  className="deleteButton"
                  onClick={() => handleDelete(todo.id)}
                ></button>
                {/* tha prepei na dixnei to modal otan patiseis to koubi */}
                {/* <button onClick={() => updateField(todo.id, "text")}>
                  Update
                </button> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button className="addButton" onClick={openModal}></button>
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
            <form onSubmit={handleSubmit}>
              <input
                className="addNote"
                placeholder="Input you note"
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
                  disabled={!!value}
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
