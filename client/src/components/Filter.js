const Filter = ({ newSearch, setNewSearch }) => {
  const handleSearchChange = (event) => {
    setNewSearch(event.target.value.toLowerCase());
  };

  return (
    <p>
      Filter shown with:{" "}
      <input value={newSearch} onChange={handleSearchChange}></input>
    </p>
  );
};

export default Filter;
