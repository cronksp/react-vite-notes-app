import { Modal } from "react-bootstrap";
import { useState } from "react";

const updateArray = (editedNote, editIndex, notes, setNotes) => {
  const updatedNotes = [...notes];
  updatedNotes[editIndex] = editedNote;
  setNotes(updatedNotes);
};

const EditNoteModal = ({
  show,
  handleClose,
  noteToEdit,
  editIndex,
  notes,
  setNotes,
}) => {
  //set state variables
  const [editedNote, setEditedNote] = useState(null);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Note</Modal.Title>
        {noteToEdit}
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          placeholder="Update note"
          onChange={(e) => setEditedNote(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <button
          onClick={(e) => {
            handleClose();
          }}
        >
          Close
        </button>
        <button
          onClick={(e) => {
            updateArray(editedNote, editIndex, notes, setNotes);
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
