/* eslint-disable react/prop-types */
import ToDoList from "./ToDoList";
import detective from "../images/detective.png";
import "./list.css";

const List = ({ todos, handleUpdateProgress, handleDelete }) => {
  return (
    // Create a TodoList container
    <div className="list">
      {todos.length ? (
        // Create TodoList
        <ToDoList
          todos={todos}
          handleUpdateProgress={handleUpdateProgress}
          handleDelete={handleDelete}
        />
      ) : (
        // if TodoList is empty, then show an alternative image instead
        <div>
          <img className="empty-list-image" src={detective} />
          <div className="empty-list-text">Empty...</div>
        </div>
      )}
    </div>
  );
};

export default List;
