const mongoose = require('mongoose');

const dbUrl = 'mongodb+srv://vivekkumarprince1:fmpg%40123@fmpg.fzm8y3a.mongodb.net/?retryWrites=true&w=majority&appName=fmpg';

const options = {
  // useNewUrlParser: true,
  // useUnifiedTopology: true,
  // useCreateIndex: true,
  // useFindAndModify: false,
};

mongoose.connect(dbUrl, options)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1); // Exit the process with a non-zero status code
  });

module.exports = mongoose;
