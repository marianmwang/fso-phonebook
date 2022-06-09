const homeRouter = require("express").Router();
const Person = require("../models/person");

homeRouter.get("/", (req, res) => {
  res.status(404).end();
});

homeRouter.get("/info", (request, response) => {
  const today = new Date().toString();
  Person.find({}).then((persons) => {
    response.send(
      `<p>Phonebook has entries for ${persons.length} people.</p>
      <p>Request made at ${today}`
    );
  });
});

module.exports = homeRouter;
