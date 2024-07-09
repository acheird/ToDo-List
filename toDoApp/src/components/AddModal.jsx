/* eslint-disable react/prop-types */
import Modal from "react-modal";

const AddModal = ({ isOpen, closeModal, value, setValue, handleAddTodo }) => {
  return (
    <Modal
      isOpen={isOpen}
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
          backgroundColor: "white",
          // "border-radius": "30px",
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
  );
};

export default AddModal;
