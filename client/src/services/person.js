import axios from "axios";

const baseUrl = "/api/persons";

const getPersons = () => {
  const req = axios.get(baseUrl);
  return req.then((r) => r.data);
};

const create = (newObject) => {
  const req = axios.post(baseUrl, newObject);
  return req.then((r) => r.data);
};

const deletePerson = (personId) => {
  const req = axios.delete(`${baseUrl}/${personId}`);
  return req.then((r) => r.data);
};

const update = (personId, newObject) => {
  const req = axios.put(`${baseUrl}/${personId}`, newObject);
  return req.then((r) => r.data);
};

const personService = {
  getPersons,
  create,
  deletePerson,
  update,
};

export default personService;
