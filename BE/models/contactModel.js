const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fname: String,
  lname: String,
  contno: String,
  description: String,
});

const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
