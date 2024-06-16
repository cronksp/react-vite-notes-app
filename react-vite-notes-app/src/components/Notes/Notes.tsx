import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import EditNoteModal from "../Modals/EditNoteModal";
import { ListGroup, ListGroupItem } from "react-bootstrap";
import { Form } from "react-bootstrap";
import "./Notes.css";
import Stack from "@mui/material/Stack";

function Notes() {
  const [notes, setNotes] = useState<string[]>([]);
  const [currentNote, setCurrentNote] = useState<string>("");
  const [showEditModal, setshowEditModal] = useState(false);
  const [editIndex, setEditIndex] = useState<number>(-1);

  // Load notes from localStorage when the component mounts
  useEffect(() => {
    const savedNotes = localStorage.getItem('notes');
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes) as string[]);
      console.log('saved notes: ' + savedNotes);
      console.log('parsed saved notes: ' + JSON.parse(savedNotes))
      console.log('saved notes (notes): ' + notes);

    }
  }, []);

  // Update localStorage whenever notes change
  useEffect(() => {
    console.log('new notes: ' + notes);
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);
  
  // addNote() function adds the currentNote to the notes array
  const addNote = (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault(); // Prevent the default form submission behavior (stops page reload)

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

  const matButtonctm = {
    display: "flex",
    alignItems: "center", /* Center children horizontally */
    justifyContent: "center", /* Center children vertically if there's enough space */
    padding: "10px",
    margin: "10px",
    width: "100px",
  };

  return (
    <>
      <Stack spacing={4} className="notes-section">
        <Stack direction="row" spacing={2} className="notes-container-add-note">
        <Form onSubmit={addNote}>
          <Form.Group controlId="formBasicNote" style={{ display: 'flex', alignItems: 'center' }}>
            <div>
            <Form.Control
              type="text"
              placeholder="Enter a note"
              value={currentNote}
              onChange={(e) => setCurrentNote(e.target.value)}
              style={{ flexGrow: 1, marginRight: '10px' }}
            />
          <Button style={matButtonctm}>Add</Button>
          </div>
          </Form.Group>
        </Form>
        </Stack>
        <ListGroup numbered >
          {notes.map((note, index) => (
            <ListGroupItem
              key={index}
              className="notes-container-item"
            >
              {note}
              <Stack direction="row">
              <Button variant="danger" 
              style={matButtonctm} onClick={() => deleteNote(index)}>
                Delete
              </Button>
              <Button
                variant="primary"
                style={matButtonctm}
                onClick={() => {
                  setEditIndex(index);
                  setshowEditModal(true);
                }}
              >
                Edit {/* Edit button -> opens "edit modal" */}
              </Button>
              </Stack>
            </ListGroupItem>
          ))}
        </ListGroup>
        </Stack>
      {/* 
      EditNoteModal is a custom modal component that allows you to edit a note
      Passing "set" functions allows the child component to update the parent component state 
      */}
      <EditNoteModal
        show={showEditModal} // showEditModal is a boolean that determines if the modal is open or closed
        handleClose={() => setshowEditModal(false)} // setshowEditModal is a function that allows you to update the showEditModal variable
        noteToEdit={notes[editIndex]} // noteToEdit is the note that is being edited
        editIndex={editIndex} // editIndex is the index of the note that is being edited
        setNotes={setNotes} // setNotes is a function that allows you to update the notes array
        notes={notes} // notes is the array of notes
      />
    </>
  );
}

export default Notes;
