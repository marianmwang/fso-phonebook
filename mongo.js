const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log(
    "Please provide the password as an argument: node mongo.js <password> and optionally <name> <number> afterwards"
  );
  process.exit(1);
}

const pw = process.argv[2];
const url = `mongodb+srv://fullstack:${pw}@cluster0.bxrg5.mongodb.net/phonebookApp?retryWrites=true&w=majority`;

mongoose.connect(url);

const personSchema = new mongoose.Schema({
  id: Number,
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

// Add new person to DB
if (process.argv.length === 5) {
  const person = new Person({
    id: Math.floor(Math.random() * 10000),
    name: process.argv[3],
    number: process.argv[4],
  });

  person.save().then(() => {
    console.log(
      `Added ${process.argv[3]} with number ${process.argv[4]} to the phonebook`
    );
    mongoose.connection.close();
  });
}

if (process.argv.length === 3) {
  Person.find({}).then((res) => {
    res.forEach((person) => {
      console.log(`${person.name} ${person.number}`);
    });
    mongoose.connection.close();
  });
}
