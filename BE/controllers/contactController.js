const Contact = require('../models/contactModel');

const createContact = async (req, res) => {
  const { fname, lname, contno, description } = req.body;
console.log("comes here")
  const contact = new Contact({
    fname,
    lname,
    contno,
    description,
  });

  try {
    const savedContact = await contact.save();
    res.status(200).send({
      message: 'Contact created successfully!',
      data: savedContact,
    });
  } catch (err) {
    res.status(502).send({
      message: 'OOPS! Server error',
      error: err,
    });
  }
};

const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find({});
    res.status(200).send({
      message: 'Contacts retrieved successfully!',
      data: contacts,
    });
  } catch (err) {
    res.status(500).send({
      message: 'Failed to retrieve contacts',
      error: err,
    });
  }
};

module.exports = {
  createContact,
  getContacts,
};
