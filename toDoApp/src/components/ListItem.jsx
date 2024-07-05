// import PropTypes from "prop-types";

// ListItem.propTypes = {
//   todo: PropTypes.shape({
//     id: PropTypes.number.isRequired,
//     text: PropTypes.string.isRequired,
//     completed: PropTypes.bool.isRequired,
//   }).isRequired,
//   handleUpdateProgress: PropTypes.func.isRequired,
//   handleDelete: PropTypes.func.isRequired,
// };

/* eslint-disable react/prop-types */
const ListItem = ({ todo, handleUpdateProgress, handleDelete }) => {
  return (
    <li
      key={todo.id}
      style={{ textDecoration: todo.completed ? "line-through" : "none" }}
    >
      <div className="listElement">
        <div>
          <input
            type="checkbox"
            value={todo.completed}
            defaultChecked={todo.completed}
            onClick={() => handleUpdateProgress(todo.id, "completed")}
          />
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
  );
};

export default ListItem;
