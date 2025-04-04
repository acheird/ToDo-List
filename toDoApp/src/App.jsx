import "./App.css";
import { useState, useEffect } from "react";
import Modal from "react-modal";
import List from "./components/List";
import AddModal from "./components/AddModal";
import Form from "./components/Form";
import light from "./images/light.png";
import dark from "./images/dark.png";
import search from "./images/search.png";
import search_light from "./images/search_light.png";

import {
  addTodo,
  updateProgress,
  searchTodo,
  deleteTodo,
  filterTodo,
} from "./services/TodoService";

Modal.setAppElement("#root");

export function App() {
  // Fetching data from the server
  useEffect(() => {
    fetch("http://localhost:8000/todos")
      .then((response) => response.json())
      .then((data) => setTodos(data));
  }, []);

  const [todos, setTodos] = useState([]);
  let [value, setValue] = useState("");

  // Modal state
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const openModal = () => setModalIsOpen(true);
  const closeModal = () => setModalIsOpen(false);

  // Theme state
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const [selectedImage, setSelectedImage] = useState(light);
  const [selectedSearch, setSelectedSearch] = useState(search);

  // Switch between themes (dark/light)
  useEffect(() => {
    document.body.classList.toggle("light-theme", !isDarkTheme);
  }, [isDarkTheme]);

  // Add a new task to the todo list
  async function handleAddTodo(event) {
    event.preventDefault();

    if (!value.trim()) {
      alert("Input is empty");
    } else {
      // Create Id for the new entry based on existing todos
      const newId =
        todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
      try {
        // Call AddTodo passing new todo's attributes
        const response = await addTodo({
          id: newId.toString(),
          text: value,
          completed: false,
        });

        if (response.ok) {
          const newTodo = await response.json();
          //Updates Todo List adding the new entry
          setTodos([...todos, newTodo]);
          setValue(""); // Clear the input value
          setModalIsOpen(false);
        } else {
          console.error("Error adding todo:", response.statusText);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
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
        // Search in the todo list looking for a given word
        const remainingTodos = newTodos.filter((todo) =>
          todo.text.includes(searchingWord)
        );
        // Updates Todo List based on search results
        setTodos(remainingTodos);
        setValue("");
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

  // Update todo task progress (Completed/Incompleted)
  async function handleUpdateProgress(todoId, field) {
    // Looking in todo List for a todo item with the specified todoId
    const todoIndex = todos.findIndex((todo) => todo.id === todoId);
    try {
      // Updates progress in json server
      const response = await updateProgress(
        {
          // completed : progress reversal
          [field]: !todos[todoIndex][field],
        },
        todoId
      );

      if (response.ok) {
        const newTodo = await response.json();
        const newTodos = [...todos];
        // Updates task's progress
        newTodos[todoIndex] = newTodo;
        setTodos(newTodos);
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
      // Deletes task with the specified todoId
      const response = await deleteTodo(todoId);

      if (response.ok) {
        // Updates todo List
        const remainingTodos = todos.filter((todo) => todo.id !== todoId);
        setTodos(remainingTodos);
      } else {
        console.error("Error updating todo:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  }

  // Toggle Themes
  const toggleTheme = () => {
    //Change theme color
    setIsDarkTheme((prevTheme) => !prevTheme);
    // Change toggle button's image
    setSelectedImage(selectedImage === light ? dark : light);
    // Change search button's image
    setSelectedSearch(selectedSearch === search_light ? search : search_light);
  };

  return (
    <div className={isDarkTheme ? "dark-theme" : "light-theme"}>
      <div className="main-container">
        {/* ToDo search and filtering + toggle themes*/}
        <Form
          value={value}
          setValue={setValue}
          handleSearch={handleSearch}
          handleFiltered={handleFiltered}
          toggleTheme={toggleTheme}
          selectedImage={selectedImage}
          selectedSearch={selectedSearch}
        />
        {/* ToDoList section */}
        <div className="list-container">
          <List
            todos={todos}
            handleUpdateProgress={handleUpdateProgress}
            handleDelete={handleDelete}
          />
        </div>
        <div className="add-button-wrapper">
          <button className="add-button" onClick={openModal}></button>
        </div>
        {/* Modal call / Add new Todo*/}
        <AddModal
          isOpen={modalIsOpen}
          closeModal={closeModal}
          value={value}
          setValue={setValue}
          handleAddTodo={handleAddTodo}
        />
      </div>
    </div>
  );
}

export default App;
