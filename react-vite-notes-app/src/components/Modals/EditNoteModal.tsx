import { Modal } from "react-bootstrap";
import { useState } from "react";

type EditNoteModalProps = {
  show: boolean;
  handleClose: () => void;
  noteToEdit: string;
  editIndex: number;
  notes: string[] | null;
  setNotes: (notes: string[]) => void;
  //setNotes: React.Dispatch<React.SetStateAction<string[]>>;
};

const EditNoteModal: React.FC<EditNoteModalProps> = ({
  show,
  handleClose,
  noteToEdit,
  editIndex,
  notes,
  setNotes,
}) => {

  //set state variables
  const [editedNote, setEditedNote] = useState<string>("");

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
            //updateArray(editedNote, editIndex, notes /*,setNotes*/);
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
