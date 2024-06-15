//This component will delete from an array by ID

const deleteElement = (array, index) => {
  const updatedArray = [...notes];
  const deletedArray = updatedArray.splice(index, 1);
  console.log(deletedArray);
  setNotes(updatedArray);
};

const DeleteButton = ({ index }) => {
  return (
    <Button variant="danger" onClick={() => deleteElement(array, index)}>
      Delete
    </Button>
  );
};
