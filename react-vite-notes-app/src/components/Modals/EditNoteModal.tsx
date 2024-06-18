import { Modal } from "react-bootstrap";
import { useState } from "react";
//import "./basic_modal/basic_modal.css"

type EditNoteModalProps = {
  show: boolean;
  handleClose: () => void;
  noteToEdit: string;
  editIndex: number;
  notes: string[] | null;
  setNotes: (notes: string[]) => void;
};

const EditNoteModal: React.FC<EditNoteModalProps> = ({
  show,
  handleClose,
  editIndex,
  notes,
  setNotes,
}) => {

  //set state variables
  const [editedNote, setEditedNote] = useState<string>("");

  return (
    <Modal show={show} onHide={handleClose} className="modal">
      <Modal.Header closeButton className="modal-header">
        <Modal.Title className="modal-title">Edit Note</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body">
        <input
          className="modal-input"
          type="text"
          placeholder="Update note"
          value={editedNote} // Ensure the input is controlled by adding value prop
          onChange={(e) => setEditedNote(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer className="modal-footer">
        <button
          className="modal-close-btn"
          onClick={(e) => {
            handleClose();
          }}
        >
          Close
        </button>
        <button
          className="modal-save-btn"
          onClick={(e) => {
            if (notes) {
              const updatedNotes = [...notes];
              updatedNotes[editIndex] = editedNote || ""; // Use editedNote or an empty string if editedNote is null
              setNotes(updatedNotes);
              localStorage.setItem("notes", JSON.stringify(updatedNotes));
            }
            handleClose();
          }}
        >
          Save Changes
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditNoteModal;