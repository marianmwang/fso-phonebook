const Notification = ({ message, errorType }) => {
  if (message === null) {
    return null;
  }

  const notifStyle = {
    color: "black",
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  };

  if (errorType) {
    notifStyle.color = "red";
  } else {
    notifStyle.color = "green";
  }

  return <div style={notifStyle}>{message}</div>;
};

export default Notification;
