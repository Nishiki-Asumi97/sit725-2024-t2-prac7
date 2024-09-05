const express = require('express');
const router = express.Router();
const { createContact, getContacts } = require('../controllers/contactController');

router.post('/submit', createContact);
router.get('/', getContacts);

module.exports = router;