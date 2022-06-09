const Name = ({ name, number, handleClick }) => {
  return (
    <p>
      {name} {number}
      <button onClick={handleClick}>Delete</button>
    </p>
  );
};

export default Name;
