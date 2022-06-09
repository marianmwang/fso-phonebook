import { useState, useEffect } from "react";
import personService from "./services/person";
import Name from "./components/Name";
import PersonForm from "./components/PersonForm";
import Filter from "./components/Filter";
import Notification from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newSearch, setNewSearch] = useState("");
  const [errorMessage, setErrorMessage] = useState(null);
  const [errorType, setErrorType] = useState(true);

  useEffect(() => {
    personService.getPersons().then((allPersons) => setPersons(allPersons));
  }, []);

  const handleError = (errorMsg, errorType) => {
    setErrorMessage(errorMsg);
    setErrorType(errorType);
    setTimeout(() => {
      setErrorMessage(null);
    }, 4000);
  };

  const handleClick = (id) => {
    if (window.confirm("Delete?")) {
      const person = persons.filter((x) => x.id === id)[0];
      console.log(person);
      personService.deletePerson(id);
      handleError(`Successfully deleted ${person.name} from the phonebook.`);
      setPersons(persons.filter((x) => x.id !== id));
    }
  };

  function filterFunction() {
    return persons
      .filter((x) => x.name.toLowerCase().search(newSearch) > -1)
      .map((x) => (
        <Name
          key={x.name}
          name={x.name}
          number={x.number}
          handleClick={() => handleClick(x.id)}
        />
      ));
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={errorMessage} errorType={errorType} />
      <Filter newSearch={newSearch} setNewSearch={setNewSearch} />
      <h2>Add new person:</h2>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        handleError={handleError}
      />
      <h2>Numbers</h2>
      {filterFunction()}
    </div>
  );
};

export default App;
