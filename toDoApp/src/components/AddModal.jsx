/* eslint-disable react/prop-types */
import Modal from "react-modal";
import "./addModal.css";
const AddModal = ({ isOpen, closeModal, value, setValue, handleAddTodo }) => {
  return (
    // Modal call
    <Modal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="ExampleModal"
      style={{
        content: {
          top: "32%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          transform: "translate(-50%, -50%)",
          padding: "0px",
          "border-radius": "10px",
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

              <button className="submitButton" type="submit">
                APPLY
              </button>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default AddModal;
