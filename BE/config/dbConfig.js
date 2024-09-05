const mongoose = require('mongoose');

const dbConfig = () => {
  const uri = 'mongodb+srv://nishikideakin:deakin123@cluster0.shaixzy.mongodb.net/your-database-name';
  
  mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => {
      console.error('Failed to connect to MongoDB', err);
      process.exit(1);
    });
};

module.exports = dbConfig;
