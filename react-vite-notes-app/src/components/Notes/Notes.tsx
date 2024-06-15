import { useState } from "react";
import Button from "react-bootstrap/Button";
import EditNoteModal from "../Modals/EditNoteModal";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Form } from "react-bootstrap";

function Notes() {
  const [notes, setNotes] = useState<string[]>([]);
  const [currentNote, setCurrentNote] = useState("");
  const [showEditModal, setshowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number>(-1);

  // addNote() function adds the currentNote to the notes array
  const addNote = () => {
    // trim() removes whitespace from both ends of a string
    // if the currentNote is not empty, add it to the notes array
    if (currentNote.trim() !== "") {
      // spread operator ... to copy the existing notes array and add the new note
      setNotes([...notes, currentNote]);
      //reset the currentNote to empty string
      setCurrentNote("");
    }
  };

  // deleteNote() function deletes a note from the notes array
  // TODO - make this a separate component
  const deleteNote = (index: number) => {
    const updatedNotes = [...notes];
    updatedNotes.splice(index, 1);
    setNotes(updatedNotes);
  };

  // Function to handle closing the modal
  const handleCloseEditModal = () => {
    setshowEditModal(false);
  };

  return (
    <>
      <div>
        <h1>Notes App test</h1>
        <Form>
          <Form.Group controlId="formBasicNote">
            <Form.Label>Enter a note</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a note"
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
            />
          </Form.Group>
        </Form>
        <button onClick={addNote}>Add</button>
        <ListGroup numbered>
          {notes.map((note, index) => (
            <ListGroupItem
              key={index}
              className="d-flex justify-content-between align-items-start"
            >
              {note}
              <Button variant="danger" onClick={() => deleteNote(index)}>
                Delete
              </Button>
              <Button
                variant="primary"
                //onClick={() => handleOpenEditModal(index)}
                onClick={() => {
                  setEditIndex(index);
                  setshowEditModal(true);
                }}
              >
                Edit {/* Edit button -> opens "edit modal" */}
              </Button>
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
      {/* 
      EditNoteModal is a custom modal codddmponent that allows you to edit a note
      Passing "set" functions allows the child component to update the parent component state 
      */}
      <EditNoteModal
        show={showEditModal} // showEditModal is a boolean that determines if the modal is open or closed
        handleClose={setshowEditModal} // setshowEditModal is a function that allows you to update the showEditModal variable
        noteToEdit={notes[editIndex]} // noteToEdit is the note that is being edited
        editIndex={editIndex} // editIndex is the index of the note that is being edited
        setNotes={setNotes} // setNotes is a function that allows you to update the notes array
        notes={notes} // notes is the array of notes
      />
    </>
  );
}

export default Notes;
