import personService from "../services/person";
import { useState } from "react";

const PersonForm = ({ persons, setPersons, handleError }) => {
  const [newNumber, setNewNumber] = useState("");
  const [newName, setNewName] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const personCopy = persons.find((x) => x.name === newName);
    if (personCopy !== undefined) {
      if (
        window.confirm(
          `${newName} is already in the phonebook. Would you like to update their number?`
        )
      ) {
        const changedPerson = { ...personCopy, number: newNumber };
        personService
          .update(personCopy.id, changedPerson)
          .then(() => {
            handleError(
              `Successfully changed ${newName}'s number in the phonebook.`,
              false
            );
            setPersons(
              persons.map((x) => (x.name !== newName ? x : changedPerson))
            );
          })
          .catch((error) => handleError(error.response.data.error, true));
      }
    } else {
      const newPerson = {
        name: newName,
        number: newNumber,
        id: persons.length + 1,
      };
      personService
        .create(newPerson)
        .then((newPerson) => {
          setPersons(persons.concat(newPerson));
          setNewName("");
          setNewNumber("");
        })
        .then(
          handleError(`Successfully added ${newName} to the phonebook.`, false)
        )
        .catch((error) => {
          handleError(error.response.data.error, true);
        });
    }
  };

  return (
    <form onSubmit={addPerson}>
      <div>
        Name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        Number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

export default PersonForm;
