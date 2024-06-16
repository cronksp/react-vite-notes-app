import { Modal } from "react-bootstrap";
import { useState } from "react";

/*
const updateArray = (editedNote: string, editIndex: number, notes: string[] = [], setNotes: (notes: string[] | null) => void) => {
  const updatedNotes = [...notes];
  updatedNotes[editIndex] = editedNote;
  setNotes(updatedNotes);
};
*/

type EditNoteModalProps = {
  show: boolean;
  handleClose: () => void;
  noteToEdit: string;
  editIndex: number;
  notes: string[] | null;
  //setNotes: (notes: string[] | null) => void;
  //setNotes: any
  setNotes: React.Dispatch<React.SetStateAction<string[]>>;
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

  /*
  const updateArray = (
    editedNote: string | null,
    editIndex: number,
    notes: string[] | null,
    setNotes: (notes: string[] | null) => void
  ) => {
    const updatedNotes = notes ? [...notes] : [];
    updatedNotes[editIndex] = editedNote ?? ""; // Provide a default value for editedNote
    setNotes(updatedNotes);
  };
  */

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
