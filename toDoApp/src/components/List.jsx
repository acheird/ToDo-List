import ToDoList from "./ToDoList";
import detective from "../images/detective.png";

const List = ({ todos, handleUpdateProgress, handleDelete }) => {
  return (
    <div className="list">
      {todos.length ? (
        <ToDoList
          todos={todos}
          handleUpdateProgress={handleUpdateProgress}
          handleDelete={handleDelete}
        />
      ) : (
        // if todo list is empty, then show an alternative image instead
        <div>
          <img className="emptyListImage" src={detective} />
          <div className="emptyListText">Empty...</div>
        </div>
      )}
    </div>
  );
};

export default List;
