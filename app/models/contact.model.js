const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  address: { type: String },
  phone: { type: String },
  favorite: { type: String },
});

module.exports = mongoose.model("Contact", contactSchema);
