const mongoose = require("mongoose");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    required: true,
  },
  number: {
    type: String,
    validate: {
      validator: function (value) {
        return (
          /\d{2}-\d{6,}/.test(value) ||
          /\d{3}-\d{5,}/.test(value) ||
          /\d{8,}/.test(value)
        );
      },
    },
    required: true,
  },
});

personSchema.set("toJSON", {
  transform: (doc, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Person", personSchema);
