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
      <div className="modal">
        <div className="modal__header ">NEW NOTE</div>
        <div className="modal__form">
          <form onSubmit={handleAddTodo}>
            <input
              className="modal__input"
              placeholder="Input you note..."
              id="name"
              type="text"
              value={value}
              onChange={(event) => setValue(event.target.value)}
            />
            <div className="modal__buttons">
              <button className="modal__cancelButton" onClick={closeModal}>
                CANCEL
              </button>

              <button className="modal__submitButton" type="submit">
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
